const Message = require('../models/message.model.js');

// C
exports.create = (req, res) => {

    if(!req.body.messageText) {
        return res.status(400).send({
            errorMessage: "Message cannot be empty"
        })
    }

    const message = new Message({
        messageText: req.body.messageText,
        nationality: req.body.nationality || "",
        age: req.body.age || null
    });

    message.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            errorMessage: err.message || "An error occurred while sending the message."
        });
    });
};



// R
exports.findAll = (req, res) => {

    Message.find()
    .then(messages => {
        res.send(messages);
    }).catch(err => {
        res.status(500).send({
            errorMessage: err.message || "An error occurred while retrieving messages."
        });
    });
};



// R by Id
exports.findFirst = (req, res) => {

    Message.findById(req.params.messageId)
    .then(message => {
        if(!message) {
            return res.status(404).send({
                errorMessage: "Message not found with id " + req.params.messageId
            });
        }
        res.send(message);
    }).catch(err =>  {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                errorMessage: "Message not found with id " + req.params.messageId
            });
        }
        return res.status(500).send({
            errorMessage: "Error retrieving message with id " + req.params.messageId
        });
    })

};



// U
exports.update = (req, res) => {

    if(!req.body.messageText) {
        return res.status(400).send({
            errorMessage: "Message content cannot be empty"
        })
    }

    Message.findByIdAndUpdate(req.params.messageId, {
        messageText: req.body.messageText,
        nationality: req.body.nationality || "",
        age: req.body.age || null
    }, {new: true})
    .then(message => {
        if(!message){
            return res.status(404).send({
                errorMessage: "Message not found with id " + req.params.messageId
            })
        }
        res.send(message);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                errorMessage: "Message not found with id " + req.params.messageId
            })
        }
        return res.status(500).send({
            errorMessage: "Error updating message with id " + req.params.messageId
        });
    });
};



// D
exports.delete = (req, res) => {

    Message.findByIdAndRemove(req.params.messageId)
    .then(message => {
        if(!message) {
            return res.status(404).send({
                errorMessage: "Message not found with id " + req.params.messageId
            });
        }
        return res.send({OKmessage: "Message deleted succesfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Message not found with id " + req.params.messageId
            });                
        }
        return res.status(500).send({
            message: "Could not delete message with id " + req.params.messageId
        });
    });
};