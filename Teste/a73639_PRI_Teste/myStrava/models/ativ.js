var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AtivSchema = new Schema({
    distance:{type:Number, required:true},
    moving_time:{type:Number, required:true},
    type:{type:String, required:true},
    start_date:{type:String, required: true}
}, {
    versionKey: false 
})

module.exports = mongoose.model('Atividade', AtivSchema, 'informacao')
