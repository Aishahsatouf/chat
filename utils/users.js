'use strict';

const allUsers=[];

function userJoin (id,username,room){
const user={
    id,
    username,
    room
}
allUsers.push(user);
 
return user
}

function getCurrentUser(id){
    return allUsers.find(user=>user.id==id)
}

// if the user left the chat 
function userLeft(id){
    const index = allUsers.findIndex(user => user.id === id);

    if (index !== -1) {
      return allUsers.splice(index, 1)[0];
    }
  
}

function getUsersRoom(room){
    return allUsers.filter(user => user.room === room);
}

module.exports={
    userJoin,
    getCurrentUser,
    userLeft,
    getUsersRoom
}