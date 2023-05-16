const sala = window.location.pathname.replace(/\//g, "")
console.log(sala)
const socket = io(`http://localhost:3000/${sala}`)

let user = null

socket.on("update_messages", (messages) =>{

    upDateMessages(messages)
})

function upDateMessages(messages){
    const div_message = document.querySelector("#messages")
    let list_messages = "<ul>"

    messages.forEach(message => {
        list_messages += `<li>${message.user}: > ${message.msg}</li>`
    });
    list_messages += "</ul>"

    div_message.innerHTML = list_messages
    
}

document.addEventListener("DOMContentLoaded", ()=>{

    const form = document.querySelector("#message_form")

    form.addEventListener("submit", (event)=>{
        event.preventDefault()

        if(!user){
            alert("Defina um usuário")
            return
        }

        const message = document.forms["message_form_name"]["msg"].value

        document.forms["message_form_name"]["msg"].value = ""
        socket.emit("new_message", { user: user, msg: message})
        console.log(message)
})

    const userForm = document.querySelector("#user_form")

    userForm.addEventListener("submit", (event)=>{
        event.preventDefault()
        user = document.forms["user_form_name"]["user"].value;
        userForm.parentNode.removeChild(userForm)
    })
})