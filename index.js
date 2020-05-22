const { Command } = require("commander")

const loadOptions = require('./options/load-options')


const setOption = (program, option) => {
    const { alias, command, description } = option;
    program.option(`${alias}, ${command}`, description)
} 

const resolveOption = (program, options) => {

    // Get a option
    const result = Object.keys(options).map(({ command, resolve }, index) => {
        const fn = Object.keys(program).includes(command)
        return fn && resolve
    })


    // If exists validators, resolve validators


    // Call Resolve Function and Waiting to resolve


    console.log(result)
}

const startCLI = async () => {
    // Read .jadeclirc
    const cliConfig = {
        version: '1.0.0',
        options: await loadOptions()
    }

    const program = new Command();
    program.version(cliConfig.version)

    // Load Options Dinamicly
    cliConfig.options.forEach(opt => setOption(program, opt))

    // Make resolve options
    // console.log(cliConfig)
    resolveOption(program, cliConfig.options)

    program.parse(process.argv);

}

startCLI();