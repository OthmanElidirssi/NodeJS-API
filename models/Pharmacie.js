const mongoose=require('mongoose');

const pharmacieSchema=new mongoose.Schema({
    nom:{
        type:String,
        require:true
    },
    adresse:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:false
    },
    latitude:{
        type:Number,
        require:true
    },
    longitude:{
        type:Number,
        require:true        
    },
    zone:{
        type:mongoose.Types.ObjectId,
        ref:'Zone',
        require:true
    },
    gardes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Garde' }]
})
module.exports=mongoose.model('Pharmacie',pharmacieSchema);