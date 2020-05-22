module.exports = async option => {
    // console.log(option)
    option.alias("s")
    option.command("service")
    option.description("Create a new Service")
}