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
    <span class="popuptext" id="myPopup"><b>${user.username}</b><br> ${user.room} <br> Temps pour rejoindre le 1er stop : <span id="renderTime"></span> heures</span>
  </div></li>`).join('')}
    `;
}

// Calcule des temps de trajets et injection dans le DOM
function getDistance(from,by,to){
    const container = document.getElementById('time-estimation');
    const renderTime = document.getElementById('renderTime');
    document.getElementById("time-container").style.opacity = "1";
    let distanceTotal = (from.distanceTo(by) + by.distanceTo(to)).toFixed(0)/1000;
    let distanceStop = from.distanceTo(by).toFixed(0)/1000;
    speed = 5;
    let routeTotal = (distanceTotal / speed).toFixed(2);
    let routeStop = (distanceStop / speed).toFixed(2);
    container.innerHTML = routeTotal;
    renderTime.innerHTML =  routeStop;
    console.log(container);
}


