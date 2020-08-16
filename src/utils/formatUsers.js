module.exports = function (users) {
    formatedUsers = []
    users.forEach(user => {
        const format = `<b>@${user.username}:</b>\n<strong>github</strong> → <code>${user.github ? user.github : 'ainda não cadastrado'}</code>\n<strong>stack</strong> → <code>${user.stack ? user.stack : 'ainda não cadastrado'}</code>\n<strong>techs</strong> → <code>${user.techs.length ? user.techs : 'ainda não cadastrado'}</code>\n`
        formatedUsers.push(format)
    })
    return formatedUsers.join('\n')
}