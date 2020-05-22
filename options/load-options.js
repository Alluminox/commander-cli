const fs = require("fs");
const path = require("path");
const { promisify } = require("util")

const applyMiddlewares = (ctx, ...middlewares) => {
    const run = current => {
        if (!middlewares || !(current < middlewares.length)) return;
        const next = () => run(current + 1);
        middlewares[current](ctx, next)
    }
    run(0);
}

const option = () => {
    const ctx = {};
    const replacePattern = (value) => value.replace(/[-]+/gi, "");

    const alias = value => ctx.alias = `-${replacePattern(value)}`
    const command = (value) => ctx.command = `--${replacePattern(value)}`
    const description = (value) => ctx.description = value
    const resolver = (fn) => ctx.resolver = fn

    const addValidator = (fn) => {
        if (!ctx.validators) ctx.validators = []
        ctx.validators.push(fn)
    } 


    const toObject = () => ({
        ...ctx
    })


    return {
        alias,
        command,
        description,
        addValidator,
        toObject,
        resolver
    }
}

const optionsPath = path.resolve(__dirname, ".")

/*
Filter files
*/
const filterFolder = (files, prefix, ...exclude) => {
    return files
        .filter(file => file.endsWith(prefix) && !exclude.includes(file))
        .filter(file => file !== undefined)
}


const getOptionFiles = async () => {
    if (!fs.existsSync(optionsPath)) throw new Error("Directory ", optionsPath, " dot exists");

    const files = await promisify(fs.readdir)(optionsPath)    
    const currentFile =    path.basename(__filename)
 
    return filterFolder(files, ".option.js", currentFile);
    // return files.filter(file => file.endsWith(".option.js") && file !== currentFile)
}


const mountOptionFiles = files => {
    const js = files.map(file => require(path.resolve(optionsPath, file)))
    const proms = []
    js.forEach(file => {
        if (typeof file !== 'function') return

        const obj = option()
        proms.push(file(obj).then(() => obj.toObject()))
    })
    return Promise.all(proms);
}

module.exports = async () => {
    const files = await getOptionFiles()
    return (await mountOptionFiles(files))
}


