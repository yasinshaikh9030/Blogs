import express from "express"; // or const express = require("express");
import { Router } from "express";
const router = Router(); // or const router =express.Router();
import {
  createcomment,
  getallcomments,
} from "../controller/commentcontroller.js"; //
import { createpost } from "../controller/postcontroller.js";
import { getallposts } from "../controller/postcontroller.js";
import { likepost } from "../controller/likecontroller.js";
import { unlikepost } from "../controller/likecontroller.js";
//mapping router
router.post("/comment/create", createcomment);
router.post("/post/create", createpost);
router.get("/post/getall", getallposts);
router.post("/post/likes", likepost);
router.post("/post/unlike", unlikepost);
router.get("/comment/getall", getallcomments);
//exports
export default router;
