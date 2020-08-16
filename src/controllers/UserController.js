const User = require('./../models/User')
const Extra = require('telegraf/extra')

const formatUsers = require('./../utils/formatUsers')

async function registerUser(ctx) {
    const _id = ctx.message.from.id
    const name = ctx.message.from.first_name
    const username = ctx.message.from.username

    try {
        const exist = await User.findById(_id)
        if (exist) return ctx.reply(`${name} já registrado!`)
        await User.create({ _id, name, username })
        return ctx.reply(`${name} registrado com sucesso!`)
    } catch (err) {
        console.log('registerUser', err)
    }
}

async function listUsers(ctx) {
    try {
        const users = await User.find()

        const formatedUsers = formatUsers(users)

        return ctx.reply(formatedUsers, Extra.HTML())
    } catch (err) {
        console.log('searchUsers', err)
    }
}

async function searchUsers(ctx) {
    const search = ctx.message.text.trim().replace('/search', '').trim().toLowerCase()

    if(search === '@makeprojectsbot' || search === '') return ctx.reply('Exemplo:\n/search react js\n/search frontend')

    let filter = {}

    if (search.includes('full') || search.includes('front') || search.includes('back')) {
        filter = { stack: new RegExp(search, 'gi') }
        console.log(filter)
    } else if (!search) {
        return ctx.reply('Você precisa passar algum filtro, se quiser a lista de todos os devs use /list')
    } else {
        filter = { techs: new RegExp(search, 'gi') }
    }

    try {
        const users = await User.find(filter)
        if (!users.length) return ctx.reply('não encontrei nada')

        const formatedUsers = formatUsers(users)

        return ctx.reply(formatedUsers, Extra.HTML())
    } catch (err) {
        console.log('searchUsers', err)
    }
}

async function registerGitHub(ctx) {
    const _id = ctx.message.from.id

    const github = ctx.message.text.replace('/github', '').trim().toLowerCase()

    if(github === '@makeprojectsbot' || github === '') return ctx.reply('Exemplo:\n/github usuario-no-github')

    try {
        await User.findByIdAndUpdate(_id, { github }, { new: true })
        return ctx.reply(`GitHub adicionado!`)
    } catch (err) {
        console.log('registerGitHub', err)
    }
}

async function registerStack(ctx) {
    const _id = ctx.message.from.id

    const stack = ctx.message.text.replace('/stack', '').trim().toLowerCase()

    if(stack === '@makeprojectsbot' || stack === '') return ctx.reply('Exemplo:\n/stack fullstack')

    try {
        await User.findByIdAndUpdate(_id, { stack }, { new: true })
        return ctx.reply(`Stack adicionada!`)
    } catch (err) {
        console.log('registerStack', err)
    }
}

async function registerTechs(ctx) {
    const _id = ctx.message.from.id

    let techs = ctx.message.text.replace('/techs', '').toLowerCase()

    if(techs === '@makeprojectsbot' || techs === '') return ctx.reply('Exemplo:\n/techs html, css, javascript')

    techs = techs.split(',').map(str => str.trim())

    try {
        await User.findByIdAndUpdate(_id, { techs }, { new: true })
        return ctx.reply(`Techs adicionadas!`)
    } catch (err) {
        console.log('registerTechs', err)
    }
}

async function quitUser(ctx) {
    console.log(ctx.message)
    const _id = ctx.message.from.id

    try {
        await User.findByIdAndDelete(_id)
        return ctx.reply(`Você foi removido do meu registro, /register para se registrar novamente`)
    } catch (err) {
        console.log('deleteUser', err)
    }
}

module.exports = {
    listUsers,
    searchUsers,
    registerUser,
    registerGitHub,
    registerStack,
    registerTechs,
    quitUser
}