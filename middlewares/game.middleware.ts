import { body } from "express-validator";

export const GameMiddleware = {
  play: body("move", "Veuillez choisir entre pierre, feuille ou ciseaux")
    .notEmpty()
    .toLowerCase()
    .isIn(["pierre", "feuille", "ciseaux"]),
  cheat: [
    body("win", "Win est vide, Veuillez rentrer un nombre").optional().isInt(),
    body("lose", "Lose est vide, Veuillez rentrer un nombre")
      .optional()
      .isInt(),
    body("draw", "Draw est vide, Veuillez rentrer un nombre")
      .optional()
      .isInt(),
  ],
};
