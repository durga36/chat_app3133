const socket = io('http://localhost:3000');
const messages = document.getElementById('messages');
const msgForm = document.getElementById('msgForm');

socket.io('message', data => {
    console.log(data)
    appendMessages(data)
})

socket.io('output-messages', data => {
    console.log(data)
    if(data.length){
        data.foreach(message => {
            appendMessages(message.msg)
        })
    }
})

msgForm.addEventListener('submut', e => {
    e.preventDefault()
    socket.emit('chatmessage', msgForm.msg.value)
    console.log('submit from msgForm', msgForm.msg.value)
    msgForm.msg.value = '';
})

function appendMessages(message){
    const html = `<div>${message}</div>`
    messages.innerHTML += html;
}