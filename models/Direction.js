const { Schema, model } = require('mongoose');
const DirectionSchema = new Schema({name:{type:String,required:true},img:{type:String,},info:{type:String,},});
module.exports = model('direction', DirectionSchema);