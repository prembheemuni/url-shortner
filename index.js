import express from "express";
import dotenv from "dotenv";
import connectToMongoose from "./connection.js";
import urlRouter from "./routes/url.js";
import { logger } from "./middleware/logger.js";
import bodyParser from "body-parser";
import { errorMiddleware, notFoundRoute } from "./middleware/error.js";
import { redirectURLToOriginalURL } from "./controllers/url.js";
dotenv.config()



const app = express();

// Settings
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

// Logging 
const showLogs = process.env.LOGGER || false
showLogs && app.use(logger)

app.get("/",(req,res)=>{
    console.log("URL SHORTNER SERVICE")
    return res.status(200).json({success:true, message:'App is working...'})
})

app.get("/health",(req,res)=>{
    res.status(200).json({success : true, message : 'App is Running..'})
})


// Routes
app.use("/url",urlRouter);

// Error
app.use(errorMiddleware)
app.use(notFoundRoute)

const PORT = process.env.PORT || 3002;

connectToMongoose(process.env.MONGOOSE_URI).then(()=>{
    console.log("mongoose connection established")
}).catch((err)=>{
    console.error(err,"mongoose error")
})

app.listen(PORT,()=>{
    console.log(`App Running on PORT ${PORT}`)
})

