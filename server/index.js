const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const multer = require('multer');
const app = express();
const fs = require('fs')
const User = require('./models/user')
const cookieParser = require('cookie-parser')

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log(`Database connected`))
.catch((err) => console.log('Database not connected', err))

// middleware 

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({extended: false}))


app.use('/', require('./routes/authRoutes'))

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, 'uploads')
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

app.post('/', upload.single('test'), (req,res)=>{
    const saveImage = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        imgFile:{
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: "image/png"
        },
    });
    saveImage.save()
    .then((res)=>console.log('image is saved'))
    .catch((error)=>console.log(error, 'error has occur'))
})

app.get('/', async (req,res)=>{
    const allData = await User.find()
    res.json(allData)
})

const port = 8000;
app.listen(port, () => console.log(`server is running on port ${port} `))