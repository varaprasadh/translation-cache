const Router=require('express').Router();
const translate=require("../libs/translation-service");
const axios=require('axios');
const config=require("../config");

//in memory cache - probably redis is the best way
const mem_cache={}



/*
* @middleware - checks the cache
*/
const checkCache=(req,res,next)=>{
    console.log("middle ware ",req.url);
    let key = "__cache__" + req.originalUrl || req.url;
    if(mem_cache[key]){
        req.response={
            response:mem_cache[key],
            cached:true
        }
    }
    next();
}


/*
 *@middleware fetches the results from external server/api 
 */

const getFromExternal=async (req,res,next)=>{
    //if cache not found
    if(!req.response){
      try{
            const {text="",from="en",to="en"}=req.query;
            const {data}=await axios.get(config.TRANSLATOR_API,{params:{text,from,to}});
            let key = "__cache__" + req.originalUrl || req.url;
            mem_cache[key] = data;
            req.response = {
                response: mem_cache[key],
                cached: false
            }
      }catch(err){
          next(err);
      }
    }
    next()
}



Router.get("/translate",checkCache,getFromExternal,async (req,res)=>{
    
    try{
       res.status(200).json({
           response:req.response
       })

    }catch(err){
        res.status(400).json({
            error:"something went wrong"
        })
    }
})


module.exports=Router;
