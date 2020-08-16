const bot = require('./configs/bot')

const authMiddleware = require('./middlewares/auth')

const UserController = require('./controllers/UserController')
const AdminController = require('./controllers/AdminController')

bot.command('register', authMiddleware.chat, UserController.registerUser)
bot.command('search', authMiddleware.chat, authMiddleware.user, UserController.searchUsers)
bot.command('list', authMiddleware.chat, authMiddleware.user, UserController.listUsers)
bot.command('github', authMiddleware.chat, authMiddleware.user, UserController.registerGitHub)
bot.command('stack', authMiddleware.chat, authMiddleware.user, UserController.registerStack)
bot.command('techs', authMiddleware.chat, authMiddleware.user, UserController.registerTechs)
bot.command('quit', authMiddleware.chat, authMiddleware.user, UserController.quitUser)
bot.command('delete_all', authMiddleware.chat, authMiddleware.admin, AdminController.removeAll)

bot.launch()