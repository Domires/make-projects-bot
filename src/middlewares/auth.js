const bot = require('./../configs/bot')

const User = require('./../models/User')

async function user(ctx, next) {
    const _id = ctx.message.from.id

    try {
        const user = await User.findById(_id)
        if(!user) return ctx.reply('Você precisa se registrar! utilize o comando /register')
        return next()
    } catch (err) {
        console.log('auth error', err)
    }
}

async function admin(ctx, next) {
    const _id = ctx.message.from.id
    const chatId = ctx.chat.id
    console.log(chatId)
    try {
        const adms = await bot.telegram.getChatAdministrators(chatId)
        if (!adms.find(adm => adm.user.id === _id)) return ctx.reply('Você precisa ser um administrador para usar este comando!')
        return next()
    } catch (err) {
        console.log('auth error', err)
    }
}

async function chat(ctx, next) {
    const chatId = ctx.chat.id

    const CHAT_ID = Number('')

    if(chatId !== CHAT_ID) return ctx.reply('Acesso negado!')
    return next()
}

module.exports = {
    user,
    admin,
    chat
}