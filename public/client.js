const socket = io()

let name;
do{
  name = prompt('please enter your name')
}
while(!name)