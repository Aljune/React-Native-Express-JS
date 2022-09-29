const mongoose = require("mongoose");

const AddStudentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },

    studentEmail: {
        type: String,
        required: true,
    },

    studentPassword: {
        type: String,
        required: true,
    },
    
})

const AddStudent = mongoose.model("student", AddStudentSchema);


module.exports = AddStudent; 