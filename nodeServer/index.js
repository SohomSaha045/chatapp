// Node server
// socket io connections 
// const io=require('socket.io')(8000)
const io = require('socket.io')(process.env.PORT || 8000, {
    cors: {
      origin: '*',
    }
  });

const users={};
io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
        // console.log(name)
        users[socket.id]=name;
        
    console.log(process.env.PORT);
        socket.broadcast.emit('user-joined',name);
    
    });
    socket.on('send',message =>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });
    socket.on('disconnect',message=>{
      socket.broadcast.emit('left',users[socket.id]);
      delete users[socket.id];
    })
})
