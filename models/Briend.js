const { Schema, model } = require('mongoose')

const BriendSchema = new Schema({
    briend:{type:String}
  
})

module.exports = model('briend', BriendSchema)