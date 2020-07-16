module.exports = (app) => {
    const messages = require('../controller/message.controller.js');

    // C
    app.post('/messages', messages.create);

    // R
    app.get('/messages', messages.findAll);

    // R by Id
    app.get('/messages/:messageId', messages.findFirst);

    // U
    app.put('/messages/:messageId', message.update);

    // D
    app.delete('/messages/:messageId', message.delete);

}