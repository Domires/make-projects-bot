const User = require('./../models/User')

async function removeAll(ctx) {
    try {
        await User.deleteMany()
        return ctx.reply(`Todos os registros foram deletados!`)
    } catch (err) {
        console.log('deleteMany', err)
    }
}

module.exports = { removeAll }