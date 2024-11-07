import express from 'express'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync.js'
import fs from 'fs'
import cors from 'cors'
import bodyParser from 'body-parser'

const adapter = new FileSync('db.json')
const db = low(adapter)

const app = express()
app.use(cors())
app.use(bodyParser.json())


const defaultData = fs.readFileSync('../data/users.json');
const users = JSON.parse(defaultData);

// console.log(users)
// console.log(defaultData)

db.defaults(users).write();

app.get('/', (req, res) => {
    res.send('Express is runnig....');
})

app.get('/users', (req, res) => {
    const users = db.get('users').value();

    res.send(users);
})


app.put('/users', (req, res) => {
    const _id = req.body._id;
    const body = req.body.body;
    console.log("_id")
    console.log(_id)
    console.log(body)
    db.get('users').find({_id:_id}).assign(body).write()


    res.json('success update');
})

app.get('/users/:email', (req, res) => {
    const { email } = req.params;
    const users = db.get('users').value();
    // console.log(email)

    const foundUser = users.find((user) => user.email === email)
    foundUser ? foundUser.status = {
        "statusText": "found_record_email",
        "error": false,
        "email": email
    } : foundUser;

    // console.log(foundUser)
    const foundUserError = {
        "status": {
            "statusText": "no_found_record_email",
            "error": true,
            "email": email
        }
    }
    res.send(foundUser ? foundUser : foundUserError)
});

app.listen(8000, function () {
    console.log('listening on 8000')
})
