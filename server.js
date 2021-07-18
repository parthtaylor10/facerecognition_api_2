const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const app = express();
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile= require('./controllers/profile');
const image=require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'test',
      database: 'smartbrain'
    }
  });


app.use(express.json());
app.use(cors());

const database={
    users:[
        {
            id:'123',
            name: 'John',
            email:'john@gmail.com',
            password: 'secret',
            joined: new Date(),
            entries: 0
        },
        {
            id:'124',
            name: 'Bob',
            email:'bob@gmail.com',
            password: 'secret',
            joined: new Date(),
            entries: 0
        }
    ]
}

app.get('/',(req,res)=>{
    res.json('it is working')
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
    

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleapicall(req,res)})


app.listen(4000,()=>{
    console.log('coool')
})