import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router=express.Router();

router.post("/send/:id",verifyToken,sendMessage);
router.get("/get/:id",verifyToken,getMessages);

export default router