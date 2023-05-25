const express=require('express');
const router=express.Router();
const Pharmacie=require("../models/Pharmacie");
const PharmacieService=require('../services/PharmacieService');
const pharmacieService=new PharmacieService(Pharmacie);

router.get('/',async (req,res)=>{
    try{
        const results=await pharmacieService.getAll();
        if(results.length==0){
            res.status(404).json({"msg":"The pharmacie collection is empty"});
        }
        res.json(results);
    }catch(error){
        res.status(500).send({"msg":"Server Error"});
    }
   
})

router.get('/:id',async (req,res)=>{
    try{
        const result=await pharmacieService.getById(req.params.id);
        if(result){
            res.json(result);
        }else{
            res.status(404).json({"msg":"The Database doesn't contain this record"});
        }
    }catch(error){
        res.status(500).send({"msg":"Server Error"});
    }
})

router.get("/zone/:zoneId",async (req,res)=>{
    try{
        const result =await pharmacieService.getByZoneId(req.params.zoneId);
        if(result.length>0){
            res.json(result);
        }else{
            res.status(404).json({"msg":"The Database doesn't contain any records that match the zoneId"});
        }
    }catch(error){
        res.status(500).send({"msg":"Server Error"});
    }
})

router.post('/save',async (req,res)=>{
    try{
        const createdEntry=await pharmacieService.create(req.body);
        res.json(createdEntry);
    }catch(error){
        res.status(500).send({"msg":"Server Error"});
    }
})

//Permet de récupéper toutes les pharmacies qui correspondent à la garde spécifiée en paramètre
router.get('/garde/:jourOuNuit',(req,res)=>{
    Pharmacie.find().populate('gardes').populate('zone').then((pharmacies)=>{

        const finalArray=pharmacies.filter((entry)=>{
            return entry.gardes.some((garde)=>garde.type.toLocaleLowerCase()==req.params.jourOuNuit.toLocaleLowerCase())
        })
        return finalArray;
   
    }).then((data)=>{
        if(data.length==0){
            res.status(404).json({msg:"No Record was found"})
        }
        else{
           res.json(data);
        }
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg:'Server Error'});
    })
})



router.delete('/:id',async (req,res)=>{
    try{
        const deletedEntry=await pharmacieService.delete(req.params.id);
        console.log(deletedEntry);
        if(deletedEntry){
            res.json({ msg: 'Zone deleted' });
        }
        else{
            res.status(404).json({"msg":"The Database doesn't contain this record"});
        }
        
    }catch(error){
        res.status(500).send({"msg":"Server Error"});

    }
})
module.exports=router;
