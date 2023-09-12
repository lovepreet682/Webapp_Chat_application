console.log('Javacript')
const socket = io()

// let textarea = document.querySelector('#textarea')
const messageInp=document.getElementById('messageInp')
const form=document.getElementById('send_container')
const messageContainer=document.querySelector('.message__area')
const audio= new Audio('Tone.mp3');



do{
 username=prompt("Please, Enter the Username")
}while (!username) 


socket.emit('new-user-joined', username);
console.log('New User ',username)


// step 2:- Append the join the messgage
const AddMessageFunction = (message, position) => {
    const messgageElement = document.createElement('div');
    messgageElement.innerText = message;
    messgageElement.classList.add('message');
    messgageElement.classList.add(position);
    messageContainer.append(messgageElement);
    
    if(position=='incoming'){
        audio.play();
    }
}


socket.on('user-joined', username => {
    AddMessageFunction(`${username}, Joined the Chat`, 'incoming')
})



//submit the form 
send_container.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInp.value;
    console.log(message)
    AddMessageFunction(`You: ${message}`, 'outgoing');
    socket.emit('send', message);
    messageInp.value='';
})


//receive message 
socket.on('receive', data=>{
    AddMessageFunction(`${data.username}: ${data.message}`, 'incoming')
})

//exit user
socket.on('left-chat', username=>{
    AddMessageFunction(`${username}: Left the chat`, 'incoming')
})






// textarea.addEventListener('keyup', (e) => {
//     if (e.key === 'Enter') {
//         sendMessage(e.target.value)
//     }
// })



// function sendMessage(message) {
//     let msg = {
//         user: username,
//         message: message.trim()
//     }
//     // Append 
//     appendMessage(msg, 'outgoing')
//     textarea.value = ''
//     scrollToBottom()

//     // Send to server 
//     socket.emit('message', msg)

// }

// function appendMessage(msg, type) {
//     let mainDiv = document.createElement('div')
//     let className = type
//     mainDiv.classList.add(className, 'message')

//     let markup = `
//         <h4>${msg.user}</h4>
//         <p>${msg.message}</p>
//     `
//     mainDiv.innerHTML = markup
//     messageArea.appendChild(mainDiv)
// }

// // Recieve messages
// socket.on('message', (msg) => {
//     appendMessage(msg, 'incoming')
//     scrollToBottom()
// })

// function scrollToBottom() {
//     messageArea.scrollTop = messageArea.scrollHeight
// }