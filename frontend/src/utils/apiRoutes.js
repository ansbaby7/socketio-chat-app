const host = "http://localhost:5000"

const registerRoute = `${host}/api/user/register`
const loginRoute = `${host}/api/user/login`
const allUsersRoute = `${host}/api/user/allusers`

const addMessageRoute = `${host}/api/messages/addmessage`
// route to get all messages between two users
const allMessagesRoute = `${host}/api/messages/allmessages`


export {host,registerRoute,loginRoute,allUsersRoute,addMessageRoute,allMessagesRoute}