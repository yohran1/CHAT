const express = require("express")
const path = require("path")
const app = express()
const socketIO = require("socket.io")


app.use("/", express.static(path.join(__dirname, "public")))


const server = app.listen(3000, ()=>{
    console.log("Server Running in PORT: 3000")
})

const messages = []

const io = socketIO(server)

io.on("connection", (socket)=>{

    console.log("New Connection")
    socket.emit("update_messages", messages)

    socket.on("new_message", (data)=>{
        messages.push(data)
        console.log(messages)
        io.emit("update_messages", messages)
    })

})