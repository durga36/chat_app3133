const mongoose = require('mongoose');
const Msg = require('m/model/messages');
const mongo = 'mongodb+srv://DBK:1234@chatapp.2rg33.mongodb.net/messages?retryWrites=true&w=majority'
const io = require('socket.io')(3000);

//Connect to mongo
mongoose.connect(mongo, { userNewUrlParser: true,
useUnifiedTopology: true}).then(() => {
    console.log('connected')
}).catch(err => console.log(err))
io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-message', result)
    })
    console.log('User is connected');
    socket.emit('message', 'Welcome to Chat App');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('chatmessage', msg => {
        const message = new Msg({msg});
        message.save().then(() => {
            io.emit('message', msg)
        })
    })
})