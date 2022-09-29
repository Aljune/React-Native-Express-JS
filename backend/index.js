const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
    })
);

const AddStudentModel = require('./models/AddStudent');
mongoose.connect('mongodb://aljune2022:UEGLNiSdQ5GsWMMn@studentcrud-shard-00-00.tv4m0.mongodb.net:27017,studentcrud-shard-00-01.tv4m0.mongodb.net:27017,studentcrud-shard-00-02.tv4m0.mongodb.net:27017/?ssl=true&replicaSet=atlas-5450j2-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true
}, function (err) {
    if (err)
        return console.error(err);
})


app.post('/student/create-student', async (req, res) => {

    try {
        const { studentName, studentEmail, studentPassword, studentConfirmPassword } = req.body;
        const hashPassword = await bcrypt.hash(studentPassword, 10);
        const newStudent = new AddStudentModel({
            studentName: studentName,
            studentEmail: studentEmail,
            studentPassword: hashPassword
        });
        AddStudentModel.findOne({ 'studentEmail': studentEmail }, 'studentName studentEmail studentPassword', function (err, student) {
            if (err) return handleError(err);
            console.log(studentEmail);
            console.log(student, ' date styd');
            if (student) {
                console.log(student, ' false');
                res.status(200).json({
                    email: true,
                    message: 'Existing email'
                })
            }
            else if (studentPassword !== studentConfirmPassword) {
                console.log('asdsa');
                res.status(200).json({
                    password: true,
                    message: 'Not the same password'
                });
            }
            else {
                newStudent.save();
                res.status(200).json({
                    success: true,
                    message: 'Student created successfully.'
                })
            }
        });


    } catch (e) {
        console.log(e)
        res.status(500).json('Server error')
    }
})

app.get('/student', async (req, res) => {
    res.send(__dirname + "db.js")
})


// app.use(cookieParser());
app.use(express.json());



app.listen(PORT, () => {
    console.log("Port is running at" + PORT);
})