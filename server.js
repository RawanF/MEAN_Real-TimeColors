const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const server = app.listen(6789);
const io = require('socket.io')(server);
var color="white";
io.on('connection', function (socket) {
    socket.emit('updateNewUser', { color: color });//one client
    socket.on('change_BG', function (data) {
        color=data.color;
        io.emit('updateAllClients', { color: color });
    });
   
});
app.get("/", (req, res) => {
    res.render('index');
})
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');