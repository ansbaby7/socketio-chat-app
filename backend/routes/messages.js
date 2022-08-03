const { getAllMessages, addMessage } = require("../controllers/messagesController")

const router = require("express").Router()

router.post("/allmessages",getAllMessages)
router.post("/addmessage",addMessage)

module.exports = router;