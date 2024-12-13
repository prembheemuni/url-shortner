import { nanoid } from "nanoid"
import constants from "../constants.js"
import URL from "../models/url.js"
import { CustomError } from "../middleware/error.js"
import { TryCatch } from "../utils.js"

const baseRoute = "/url"

export const handleGenerateNewShortUrl = TryCatch(async (req,res,next) => {
    const body = req.body
    if(!body.url) return next(new CustomError("Url is needed",400));
    const shortID = nanoid(constants.NANO_ID_LENGTH)

    await URL.create(({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : []
    }))

    const shortUrl = req.hostname + baseRoute + "/" + shortID

    return res.status(201).json({success : true, shortUrl:shortUrl})
})

export const getUrlDetails = TryCatch(async (req,res,next) => {
    const {id} = req.params
    if(!id) return next(new CustomError("Please provide shortid",400))
    
    const urlDetails = await URL.findOne({shortId : id});

    if(!urlDetails) return next(new CustomError("Please provide valid short id",400))

    const data = {redirectUrl : urlDetails.redirectURL, shortId : urlDetails.shortId, clicks : urlDetails.visitHistory.length}

    return res.status(200).json({success : true, data : data})
})

export const redirectURLToOriginalURL = TryCatch(async (req,res,next) => {
    const {id} = req.params
    if(!id) return next(new CustomError("Please provide shortid",400))
    
    const urlDetails = await URL.findOne({shortId : id})

    if(!urlDetails) return next(new CustomError("Please provide valid short id",400))

    res.redirect(urlDetails.redirectURL)

})

export const getAllUrlsList = TryCatch(async (req,res,next) => {
    const data = await URL.find({})

    if(!data) return next(new CustomError("Not Data found",400))

    return res.status(200).json({success : true,data : data})
})

export const deleteShortId = TryCatch( async (req, res, next) => {
    const {id} = req.params;

    const urlFound = await URL.findOneAndDelete({shortId : id});
    if(!urlFound) return next(new CustomError("Not found"))

    return res.status(200).json({success : true, message : 'deleted successfully'})
})