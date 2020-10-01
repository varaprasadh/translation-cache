const mini_translator=require("./mini_translator");


const translate= (text,from,to)=>{
    return mini_translator.translate({text,from,to});
}


module.exports=translate;




