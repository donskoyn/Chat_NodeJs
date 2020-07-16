const socket = io.connect();
const textarea = document.querySelector("#message");
const all_messages = document.querySelector("#all_mess");
const form = document.querySelector("#messForm");
const roomNameHtml=document.querySelector('#roomName');

const roomParams=JSON.parse(localStorage.getItem('roomParams'));

const min = 1;
const max = 6;
const arrClass = ['secondary', 'danger', 'success', 'warning', 'info', 'light'];
let colorUser=null;

function randomClass(min,max,arr) {
    const random = Math.floor(Math.random() * (max - min)) + min;
    return colorUser = arr[random];

}
randomClass(min,max,arrClass);

(function () {
    socket.emit('create',roomParams.room);
    roomNameHtml.innerText=roomParams.room;

    form.addEventListener("submit", event => {

        event.preventDefault();
        socket.emit("send mess", {idroom:roomParams.room,mess: textarea.value, name: roomParams.name, className:colorUser });
        textarea.value = ""
    });

    socket.on('add mess', (data) => {
        all_messages.innerHTML += "" +
            "<div class='alert alert-" + data.className + "'>" +
                "<div class='nameUser'>" + data.name+ "</div> "
                +"<div class='textMess'>"+ data.mess +"</div>" +"" +
            "</div>";
        all_messages.scrollTop = all_messages.scrollHeight;
    });
})();
