const express=require('express');
const router=express.Router();

const Garde=require('../models/Garde');

router.get("/",(req,res)=>{
    Garde.find().then((results)=>{
        if(results.length==0){
            res.status(404).json({msg:"The Garde collection is empty"})
        }
        else{
            res.json(results);
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"Srerver Error"});
    })
})

router.get('/type/:t',(req,res)=>{
    Garde.find({type:req.params.t.toLowerCase()}).then((results)=>{
        if(results.length==0){
            res.status(404).json({msg:"No entry was found"})
        }
        else{
            res.json(results);
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"Srerver Error"});
    })
})
router.get('/:id',(req,res)=>{
    Garde.findById(req.params.id).then((result)=>{
        if(result){
            res.json(result);
        }else{
            res.status(404).json({msg:"This entry doesn't exist in the database"})
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"Srerver Error"});
    })
})


router.post('/save',(req,res)=>{
    const instance=new Garde({type:req.body.type.toLowerCase()});
    instance.save().then((result)=>{
        res.json(result);
    }).catch((err)=>{
        res.status(500).json({msg:"Srerver Error"});
    })
})

router.delete('/:id',(req,res)=>{
    Garde.findByIdAndDelete(req.params.id).then((result)=>{
        if(result){
            res.json({msg:"Record deleted"});
        }else{
            res.status(404).json({msg:"No match was found"});
        }
    
    }).catch((err)=>{
        res.status(500).json({msg:"Server Error"});
    })
})
module.exports=router;