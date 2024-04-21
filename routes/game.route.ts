// Dependences
import { Router } from "express";
import { GameController } from "../controllers/game.controller";
import { GameMiddleware } from "../middlewares/game.middleware";

// Variables
const router = Router();

// Routes
router.get("/", GameController.score);
router.delete("/reset", GameController.reset);
router.post("/play", GameMiddleware.play, GameController.play);
router.patch("/cheat", GameMiddleware.cheat, GameController.cheat);

export default router;
