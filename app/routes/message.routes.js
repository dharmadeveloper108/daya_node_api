module.exports = (app) => {
    const messages = require('../controllers/message.controller.js');

    // C
    app.post('/messages', messages.create);

    // R
    app.get('/messages', messages.findAll);

    // R by Id
    app.get('/messages/:messageId', messages.findFirst);

    // U
    app.put('/messages/:messageId', messages.update);

    // D
    app.delete('/messages/:messageId', messages.delete);

}