const { Schema, model } = require('mongoose')

const SliderSchema = new Schema({
    img:{type:String}
  
})

module.exports = model('slider', SliderSchema)