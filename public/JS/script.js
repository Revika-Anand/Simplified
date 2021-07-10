const socket = io('/');  //client initialization

//reference to the video grid in the ejs document
const vidGrid = document.getElementById('video_grid');

//to get the users name
const user = prompt("Enter your name");

//connection to the peer server
var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "443"
});

//initialization and setting of my video
const myVid = document.createElement('video');

//muting my video
myVid.muted = true;

//storing all the users connected to the call at one place
const peers = {};

//var getMedia = (navigator.mediaDevices.getUserMedia) || (navigator.webkitGetUserMedia) || (navigator.mozGetUserMedia);

//adding video and audio to the the stream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then (stream => {
    myVideoStream = stream;
    add_vid_stream(myVid, stream)

    //on connection with the call, our video stream will be added to the video grid
    peer.on('call', call => {
        call.answer(stream)
        const vid = document.createElement('video')
        call.on('stream', user_vid => {
            add_vid_stream(vid, user_vid)
        })
    })

    socket.on('user_connected', userId => {
        connect_new_user(userId, stream)
    })
})

//removes the user if he/she disconnects
socket.on('user_disconnected', userId => {
    if(peers[userId])
        peers[userId].close()
})

//emits join_room when room is initially joined
peer.on('open', id => {
    socket.emit('join_room', ROOM_ID, id, user)
})

//function to connect or disconnect a user's audio/ video
function connect_new_user(userId, stream) {
    const call = peer.call(userId, stream)
    const vid = document.createElement('video')

    call.on('stream', user_vid => {
        add_vid_stream(vid, user_vid)
    })

    call.on('close', () => {
        vid.remove()
    })

    peers[userId] = call
}

//function to add the video stream of any user
function add_vid_stream(vid, stream) {
    vid.srcObject = stream
    vid.addEventListener('loadedmetadata', () => {
        vid.play()
    })
    vidGrid.append(vid)
}

const disVid = document.getElementById("mV");
//function to disable video
function disableVid()
{
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    html = `<img src = "images/vid_dis.png" height="50px" width="50px" border="0"/>`;
    disVid.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = `<img src = "images/vid_enable.png" height="50px" width="50px" border="0"/>`;
    disVid.innerHTML = html;
  }
}

//for disconnecting the user
function end() {
  if(peers[userId])
        peers[userId].close()
}

const disAud = document.getElementById("mA");

//function to mute audio
function muteAudio()
{
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<img src = "images/mic_off.png" height="50px" width="50px" border="0"/>`;
    disAud.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<img src = "images/mic_on.png" height="50px" width="50px" border="0"/>`;
    disAud.innerHTML = html;
  }
}


//for messaging
let text = document.getElementById("chat_msg");
let send = document.getElementById("send");
let msg = document.getElementById("sent_msg");

function send_msg() {
  if (text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
  console.log(text.value);
}

//creating a new message
socket.on("createMessage", (message, userName) => {
  msg.innerHTML =
    msg.innerHTML +
    `<div class="message">
      <b> <span> 
        ${userName === user ? "me" : userName}
      </span> </b>
        <span>${message}</span>
    </div>`;
});
