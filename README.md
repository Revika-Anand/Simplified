# Simplified
Simplified is a video chat web app.
It has been named simplified becaue it has been made in a very simple manner with an easy to use user interface.

# Tech Stack
The tech stack used for this project includes the following languages and libraries:
1. HTML
2. CSS
3. JavaScript
4. Embedded JavaScript
5. Express
6. Socket.io
7. WebRTC
8. PeerJS

# Link for the website
https://simplified.azurewebsites.net/dashboard.html

# For running on your local system
## Setting up the code
1. In order to run this application on your local system, first some changes need to be made in the script.js file.
2. Go to the public folder.
3. Then the JS folder and open script.js.
4. Change the following script:
var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "443",
  debug: "true"
});
to:
var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3000",
  debug: "true"
});
## Running the code
1. Open the command prompt and run `npm install`.
2. Now run `node server.js`.
3. Open chrome browser and go to localhost:3000
