const Pharmacie=require('../models/Pharmacie');
class PharmacieService{
    constructor(pharmacieModel){
        this.model=pharmacieModel;
    }

    async getAll(){
        try{
            const results=await this.model.find();
            return results;
        }catch(error){
            throw new Error("An Error occured");
        }

    }
    async getById(phId){
        try{
            const result=await this.model.findById(phId).populate('zone');
            return result;

        }catch(error){
            throw new Error(`An Error occured`);
        }
    }

    async getByZoneId(zoneId){
        try{
            const result=await this.model.find({zone:zoneId}).populate('zone');
            return result;
        }catch(error){
            console.log(error);
            throw new Error("An Error occured");
        }
    }
    async create(httpBody){
        try{
            const createdPharmacie=new Pharmacie(httpBody);
            const savedPharmacie=await createdPharmacie.save();
            return savedPharmacie;
            
        }catch(error){
            throw new Error();
        }
    }

    async delete(phId){
        try{
            const deletedPharmacie=await this.model.findByIdAndDelete(phId)
            return deletedPharmacie;
        }catch(error){
            throw new Error('An Error occured');
        }

    }
}
module.exports=PharmacieService;