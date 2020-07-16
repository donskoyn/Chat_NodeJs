const name = document.querySelector("#name");
const idRooms=document.querySelector("#room");
const registrationForm=document.querySelector('#registrationForm');

let nameForm='';
let room='';

(function () {

    registrationForm.addEventListener("submit",event=>{
            event.preventDefault();
            room=idRooms.value;
            nameForm=name.value;
            localStorage.setItem('roomParams',JSON.stringify({name:nameForm,room}));
            window.location="http://localhost:3000/room";
        });
})();





