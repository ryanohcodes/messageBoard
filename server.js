const express = require('express')
const app = express()
const PORT = 3000

app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const connectionString = 'mongodb+srv://yoda:applepie2@cluster0.ab0yvui.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {useUnifiedTopology: true})
.then(client => {
    console.log('connected to DB')
    const db = client.db('message-board-communications')
    const messageCollection = db.collection('message')

    app.get('/',(request, response)=>{
        db.collection('message').find().toArray()
        .then(result=>{
            response.render('index.ejs',{data: result})
        })
    });

    app.delete('/delete',(request, response)=>{
        db.collection('message').deleteOne({_id: ObjectId(request.body.apple)})
        .then(result =>{
            response.json('message deleted')
        })
        .catch(err=>{
            console.log(err)
        })
    })

    app.post('/messages',(request, response)=>{
        db.collection('message').insertOne(request.body)
        .then(result => {
            console.log(result)
            response.redirect('/')
        })
        .catch(err =>{
            console.log(err)
        })
    })
})
.catch(err =>{
    console.log(err)
})






app.listen(process.env.PORT ||PORT,()=>{
    console.log(`The server is running on PORT ${PORT}. You better go catch it.`)
})