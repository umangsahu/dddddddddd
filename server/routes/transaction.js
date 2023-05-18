import { Router } from "express";
import passport from "passport";
import Transaction from "../models/transaction.js";

const router=Router();

let id;

router.get('/',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    id=req.user._id;
    const transaction=await Transaction.find({user_id:req.user._id}).sort({createdAt:-1});
    
    res.json({data:transaction})


})
router.post('/',async(req,res)=>{
   

    const {Amount,Description, TransactionType,date}=req.body;
    const transaction=new Transaction({
        amount:Amount,
        description:Description,
        transactionType:TransactionType,
        date,
        user_id: id
    })
    await transaction.save();
    res.json({message:"success"})
  
    
})

router.delete('/:id',async(req,res)=>{
    
   
    
    await Transaction.findOneAndDelete({_id: req.params.id});
    
    res.json({message:"Success"})
    
})
router.patch('/:id',async(req,res)=>{

    try {
        const data1={
            amount:req.body.Amount,
            description:req.body.Description,
         transactionType:req.body.TransactionType,
            date:req.body.date
        }
        
     
        
        const data = await Transaction.findByIdAndUpdate(req.params.id, { $set:data1 });

   
        res.json({message: "Success"});
      
      } catch (error) {
        res.status(500).json({error: "Failed to update document"});
       
      }
})
export default router;