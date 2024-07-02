import express from "express";
import { getUsersForSidebar } from "../controllers/getUsers.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/",verifyToken,getUsersForSidebar);

export default router;