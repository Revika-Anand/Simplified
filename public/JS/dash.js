//for the navbar on the dashboard
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}


//for back to top button on dashboard
function backToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//for chat window in the call room
function open_chat() {
  document.getElementById("chat").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";
}

function close_chat() {
  document.getElementById("chat").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
}

//for invite button in thw call room
function invite() {
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
}