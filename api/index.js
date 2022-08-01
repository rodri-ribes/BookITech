const express= require("express");
const morgan= require("morgan")
const app= express();

app.set("port",process.env.PORT || 4000)

//middleware
app.use(morgan("dev"))
app.use(express.json())




app.listen(app.get("port"),()=>{
    console.log(`corre el back en el ${app.get("port")}` )
})