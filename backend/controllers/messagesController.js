const Message = require("../models/Message")

const addMessage = async (req,res,next) => {
    try {
        const {message, from, to} = req.body
        const data = await Message.create({
            message: {text: message},
            users : [from,to],
            sender: from
        })
        if(data){
            return res.status(200).json({msg:"Message added successfully"})
        }

        return res.json({msg: "Failed to add message to the database"})
    }catch(ex){
        next(ex)
    }
}

const getAllMessages = async (req,res,next) => {
    try {
        const {from,to} = req.body
        const messages = await Message.find({
            users : {
                $all : [from,to]
            }
        }).sort({updatedAt: 1})

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        res.status(200).json(projectedMessages)
    } catch(ex){
        next(ex)
    }
}

module.exports = {addMessage, getAllMessages}