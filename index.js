const express = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);
var app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

io.on('connection', function(socket) {
    console.log('connection from client to server' + socket.id);

    socket.on('disconnect', function() {
        console.log(socket.id + 'client discoonect server');
    });

    socket.on('Client-send-data', function(data) {
        console.log(socket.id + 'send:' + data);
        io.sockets.emit('server-send-data' + data + '.');
    });
});

app.get('/', (w, r) => {
    r.render('trangchu');
});

app.listen(9000);