const mongoose = require('mongoose')

const cryptoSchema = new mongoose.Schema({
        name:{
            type:String,
           
        },
        last:{
            type:String,
            
        },
        buy:{
            type:String,
            
        },
        sell:{
            type:String,
            
        },
        volume:{
            type:String,
            
        },
        base_unit:{
            type:String,
            
        },
}, {timestamps:true})

module.exports = mongoose.model('Crypto', cryptoSchema)