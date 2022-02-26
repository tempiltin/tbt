// direct
// student
// Teacher
// partner

const { Schema, model } = require('mongoose')

const staticSchema = new Schema({
    direct: {
        type: Number,
        required: true
    },
    student: {
        type: Number,
        required: true
    },
    teacher: {
        type: Number,
        required: true
    },
    partner: {
        type: Number,
        required: true
    },
 
})

module.exports = model('statistic', staticSchema)