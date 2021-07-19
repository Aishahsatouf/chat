const options = {
    transports: ['websocket'],
};
const chatForm =document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName=document.getElementById('room-name');
const roomUsers=document.getElementById('users');
const socket = io('localhost:3000/', options);

//get  username and room from a url

const {username,room}= Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
//  console.log(username,room)

socket.emit('joinRoom',{username,room});

socket.on('roomUser',({room,users})=>{
outputRoom(room)
outputUsers(users)
})

socket.on('message',message=>{
    console.log(message)
    otputMessage(message);
    // make the message div scroll to the bottom
    chatMessage.scrollTop=chatMessage.scrollHeight;
});

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg =e.target.msg.value;
    socket.emit('chatMessage',msg);
    e.target.reset();
})

function otputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`   <p class="meta"> ${message.userName} <span> ${message.time}</span></p>
    <p class="text">
     ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
// Add the room name to dom 
function outputRoom(room){
   
    roomName.innerText = room
}

function outputUsers (users) {
    // console.log('user')
    roomUsers.innerHTML= ''
    let li;
    users.map(user=>{
        li=document.createElement('li');
        li.innerText=user.username;
        roomUsers.appendChild(li);
    })
}
