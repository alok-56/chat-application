
const express=require('express');
const app=express();
const server=require('http').createServer(app);
const io=require('socket.io')(server);
const port = process.env.PORT || 3000;


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

const user={};

io.on('connection', socket=>{
    socket.on('new-user-joined',name =>{
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message : message, name : user[socket.id]});
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];

    })
})

server.listen(port ,()=>{
    console.log("app is running ")
});

