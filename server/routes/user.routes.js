const UserController = require('../controllers/user.controller')

module.exports = (app) => {
    app.post('/api/user', UserController.createOne)
    app.get('/api/user', UserController.getAll)
    app.get('/api/user/:id', UserController.getOne)
    app.put('/api/user/update/:id', UserController.updateOne)
    app.delete('/api/user/delete/:id', UserController.deleteOne)
    app.post('/api/user/login', UserController.login)
}