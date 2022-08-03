const { loginUser, registerUser, getAllUsers } = require("../controllers/userController")

const router = require("express").Router()


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/allusers/:id",getAllUsers)

module.exports = router

