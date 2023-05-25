const mongoose=require('mongoose');
const GardeSchema=new mongoose.Schema({
    type:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('Garde',GardeSchema);