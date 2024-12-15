import express from "express";
import { handleGenerateNewShortUrl, getUrlDetails, redirectURLToOriginalURL, getAllUrlsList, deleteShortId } from "../controllers/url.js";
import { isAuthenticated } from "../middleware/auth.js";

const urlRouter = express.Router();

urlRouter.post("/", isAuthenticated,handleGenerateNewShortUrl)

urlRouter.get("/all", isAuthenticated,getAllUrlsList)

urlRouter.get("/:id",redirectURLToOriginalURL)

urlRouter.delete("/:id", isAuthenticated,deleteShortId)

urlRouter.get("/details/:id",isAuthenticated, getUrlDetails)







export default urlRouter;