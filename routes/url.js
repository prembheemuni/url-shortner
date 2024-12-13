import express from "express";
import { handleGenerateNewShortUrl, getUrlDetails, redirectURLToOriginalURL, getAllUrlsList, deleteShortId } from "../controllers/url.js";

const urlRouter = express.Router();

urlRouter.post("/", handleGenerateNewShortUrl)

urlRouter.get("/all", getAllUrlsList)

urlRouter.get("/:id",redirectURLToOriginalURL)

urlRouter.delete("/:id", deleteShortId)

urlRouter.get("/details/:id", getUrlDetails)







export default urlRouter;