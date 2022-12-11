const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get Username + Room à partir de l'URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});

const socket = io();

// Rejoindre une Room
socket.emit('joinRoom', {username, room});

// Get room et users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
}) 

// Message provenant du serveur
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll quand un msg est envoyé
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Envoi message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message chat.html
    const msg = e.target.elements.msg.value;

    // Envoi message au serveur
    socket.emit('chatMessage', msg);

    // Clear le message apres l'avoir écrit
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Append message
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Ajouter nom room au DOM
function outputRoomName(room){
    roomName.innerText = room;
}

// Popup sur le nom de l'user
function popupUsers() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  

// Ajouter nom users au DOM
function outputUsers(users){
    userList.innerHTML = `
    ${users.map(user => `<li><div class="popup" onclick="popupUsers()">${user.username}
    <span class="popuptext" id="myPopup"><b>${user.username}</b><br> ${user.room} <br> Temps de trajet : x minutes</span>
  </div></li>`).join('')}
    `;
}



// // Get the chat container element
// const chatContainer = document.querySelector('.chat-container');

// // Get the join chat button
// const joinChatButton = document.querySelector('.btn');

// // Add a click event listener to the button
// joinChatButton.addEventListener('click', () => {
//   // Show the chat container element
//   chatContainer.style.display = 'block';
// });



// function showHide() {
//     document.getElementById("hidden_div").style.display = "block";
// }
 
// function showHide() {
//     var div = document.getElementById("hidden_div");
//     if (div.style.display == 'none') {
//       div.style.display = 'block';
//     }
//     // else {
//     //   div.style.display = 'none';
//     // }
// };