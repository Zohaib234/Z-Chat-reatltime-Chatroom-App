const socket = io()

let name;
do{
  name = prompt('please enter your name')
}
while(!name)

const form = document.getElementById('send-container');
const inputmessage = document.getElementById('messageInp')
const chatbox = document.querySelector(".message__area")
const submit = document.getElementById('btn');

const append = (message,position)=>{
 
  const message_element = document.createElement('div');
  const classname = position;
  console.log(classname);
  message_element.classList.add(classname);
  message_element.classList.add('message');
  message_element.innerHTML = `
  <p>${message}</p>  
  ` ;

  chatbox.appendChild(message_element);
}

socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{

  append(`${name} joind the chat`,'incoming');

})
socket.on('receive', data =>{
  append(`${data.user}: ${data.message}`,'incoming')
})


// show messages

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message = inputmessage.value
  append(`You : ${message}`,'outgoing');
  socket.emit('send',message);
  inputmessage.value='';
})




