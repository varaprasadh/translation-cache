const express =require('express');
const cors    =require('cors');

const app=express();
const handler=require("./routes/handler");
const transaltion_service=require("./routes/transaltion_service");



app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(handler);
app.use(transaltion_service);



const PORT =process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})
