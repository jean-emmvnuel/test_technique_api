const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

//les imports de routes
const userRoute = require("./src/routes/userRoute");
const transactionRoute = require("./src/routes/transactionRoute");

// middleware
app.use(express.json());

//routes
app.get("/",(req,res)=>{
    res.json({
        succes: true,
        message: "L'API est fonctionnel",
        date : Date.now()
    })
})

app.use("/api/user",userRoute);
app.use("/api/transaction",transactionRoute);



app.listen(process.env.PORT, () => {
    console.log("le serveur eest en marche");
});