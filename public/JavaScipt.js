console.log('Javacript')
const socket = io()

// let textarea = document.querySelector('#textarea')
const messageInp = document.getElementById('messageInp')
const form = document.getElementById('send_container')
const messageContainer = document.querySelector('.message__area')
const audio = new Audio('Tone.mp3');
let username;

do {
    username = prompt("Please, Enter the Username")
} while (!username)


socket.emit('new-user-joined', username);
console.log('New User ', username)


// step 2:- Append the join the messgage
const AddMessageFunction = (message, position) => {
    const messgageElement = document.createElement('div');
    messgageElement.innerText = message;
    messgageElement.classList.add('message');
    messgageElement.classList.add(position);
    messageContainer.append(messgageElement);

    // Scroll to the latest message
    messageContainer.scrollTop = messageContainer.scrollHeight

    if (position === 'incoming' && username !== message.split(':')[0].trim()) {
        audio.play();
    }
}


socket.on('user-joined', username => {
    AddMessageFunction(`${username}, Joined the Chat`, 'incoming')
})



//submit the form 
send_container.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value;
    console.log(message)
    AddMessageFunction(`You: ${message}`, 'outgoing');
    socket.emit('send', message);
    messageInp.value = '';
})


//receive message 
socket.on('receive', data => {
    AddMessageFunction(`${data.username}: ${data.message}`, 'incoming')
})

//exit user
socket.on('left-chat', username => {
    AddMessageFunction(`${username}: Left the chat`, 'incoming')
})