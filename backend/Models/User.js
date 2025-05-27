const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:
    {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
});
const UserModel=mongoose.model('User',UserSchema); 
module.exports=UserModel;

const issue = {
  road: [
    {
      title: "Newly Paved Asphalt Road",
      description: "Newly paved asphalt road with clear lane markings and smooth surface."
    }
  ],
  lighting: [
    {
      title: "Fully Functional Street Lights",
      description: "Street lights are fully operational and provide adequate night visibility."
    }
  ],
  sanitation: [
    {
      title: "Clean Street with Regular Waste Collection",
      description: "Area is regularly cleaned with no visible litter or waste accumulation."
    }
  ]
};
