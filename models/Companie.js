const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanieSchema = new Schema({
    logo:String,
    name:String,
    owner:String,
    user:String,
    password:String,
    email:String,
    number:String,
    afiliados:Array,
    url:String,
    events:[{
        idEvento:mongoose.Schema.Types.ObjectId,
        name:String,
        description:String,
        image:String,
        data:String,
        hour:String,
        adress:{
            cep:String,
            bairro:String,
            rua:String,
            cidade:String,
            estado:String,
            Latitude:String,
            Longitude:String,
        },
        ingresso:[{
            price:Number,
            tipo:String,
            lote:Number,
            limit:Number,
            sold:Number,
        }],
        costumers:Array
    }],
    money:{
        all:Number,
        tickets:Number,
    }
})

const Companie = mongoose.model('companie', CompanieSchema)

module.exports = Companie