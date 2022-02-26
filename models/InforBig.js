const { Schema, model } = require('mongoose');
const InforBigSchema = new Schema({

    name:{
        type:String,
        required:true
    },
        img1:{
            type:String,
        },
        infor:{
            type:String,
            required:true
        },
    });
module.exports = model('InformationBig', InforBigSchema);