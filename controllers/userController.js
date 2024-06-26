const User = require("../models/User");

module.exports = {
    deleteUser : async(req,res) =>{
        try{
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json({message : "Successfully Deleted the user..."});
        }
        catch(err){
            res.status(500).json({message : err});
        }
    },

    getUser : async(req,res) =>{
        try{
            const user = await User.findById(req.params.id).populate('addresses')
            if(!user){
                return res.status(401).json({message : "User does not exist..."});
            }
            const {password, __v, createdAt, updatedAt, ...userData} = user._doc;

            res.status(200).json(userData);
        }
        catch(err){
            res.status(500).json({message : err});
        }
    },
}