const express = require("express");
const app = express();
const port = process.env.port || 3000;

const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const unitRoutes = require('./routers/unitRouter');
app.use('/api/units', unitRoutes);
app.use('/api/unit', unitRoutes);

io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(()=>{
        x=parseInt(Math.random()*10);
        socket.emit('number', x);
        console.log('Emmiting Number '+x);
    }, 1000)
});

http.listen(port, ()=>{
    console.log("Server listening on port: " + port);
});

module.exports = app;