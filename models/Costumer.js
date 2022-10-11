const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CostumerSchema = new Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    number:String,
    cpf:String,
    exposure:Boolean,
    friends:[{}],
    favoritos:[{}],
    ingressos:[{
        id:mongoose.Schema.Types.ObjectId,
        show:String,
        image:String,
        data:String,
        hour:String,
        tipo:String,
        ingresso:String,
        adress:{            
            cep:String,
            bairro:String,
            rua:String,
            cidade:String,
            estado:String,
        }
    }],
    
})

const Costumer = mongoose.model('costumer', CostumerSchema)

module.exports = Costumer