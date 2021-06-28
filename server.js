const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4: uuidv4} = require('uuid');


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(uuidv4());
    //здесь переадресовываем пользователя по нужному нам адресу
    // uuid спользуем для генерации рандомных рандомных ссылок для создания комнат
    // можно указать статику какую-то, но тогда у нас будет всего одна неуникальная комната
})

app.get('/:room', (req, res) => {
    // console.log(req.params) в запросе лежит всего один параметр room
    res.render('room', {roomId: req.params.room}) //сюда можно передать любые переменные
    //название файла представления и набор переменных для него
    //если тут ничего не передаем,то ejs выдаст ошибку при вызове чего-то несуществующего
})

io.on('connection', function (socket) {
    // socket.on('join-room', (userId, roomId) => {
    //     socket.join(roomId);
    //     io.to(roomId).emit("user-connected", userId,roomId);
    // })
    socket.emit("message","Connection is ready")
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});