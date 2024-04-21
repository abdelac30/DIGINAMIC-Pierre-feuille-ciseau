import { Request, Response } from "express";
import { validationResult } from "express-validator";
import db from "../data/db.json";
import * as fs from "fs";
import { GenerateRandomMove } from "../utils/RandomMove";

export const GameController = {
  /**
   * Retourne le score de la partie
   * @param {Request} req La requête de l'utilisateur
   * @param {Response} res La réponse du serveur
   */
  score: (_: any, res: Response) => {
    const game = db;
    return res.json(game);
  },
  play: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { move } = req.body;
    const player_2 = GenerateRandomMove();

    const result = db;
    let message = "";

    switch (String(move).toLowerCase()) {
      case "feuille":
        if (player_2 == "pierre") {
          result.win += 1;
          message =
            "Tu joue la feuille, ton adversaire a la Pierre, Tu as gagne !";
        }
        if (player_2 == "feuille") {
          result.draw += 1;
          message =
            "Tu joue la feuille, ton adversaire a la feuille, égalité !";
        }
        if (player_2 == "ciseaux") {
          result.lose += 1;
          message =
            "Tu joue la feuille, ton adversaire a la ciseaux, Tu as perdu !";
        }
        break;
      case "ciseaux":
        if (player_2 == "pierre") {
          result.lose += 1;
          message =
            "Tu joue le ciseaux, ton adversaire a la Pierre, Tu as perdu !";
        }
        if (player_2 == "feuille") {
          result.win += 1;
          message =
            "Tu joue le ciseaux, ton adversaire a la feuille, Tu as gagne !";
        }
        if (player_2 == "ciseaux") {
          result.draw += 1;
          message =
            "Tu joue le ciseaux, ton adversaire a le ciseaux, égalité !";
        }
        break;
      default:
        if (player_2 == "pierre") {
          result.draw += 1;
          message = "Tu joue le pierre, ton adversaire a la pierre, égalité !";
        }
        if (player_2 == "feuille") {
          result.lose += 1;
          message =
            "Tu joue le pierre, ton adversaire a la feuille, Tu as perdu !";
        }
        if (player_2 == "ciseaux") {
          result.win += 1;
          message =
            "Tu joue le pierre, ton adversaire a la ciseaux, Tu as gagne !";
        }
        break;
    }

    fs.writeFileSync("./data/db.json", JSON.stringify(result));

    return res.json({
      message: message,
      score: result,
    });
  },
  cheat: (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { win, lose, draw } = req.body;
    if (!win && !lose && !draw) {
      return res.status(400).json({ message: "Veuillez rentrer un nombre" });
    }

    fs.writeFileSync(
      "./data/db.json",
      JSON.stringify({ win: win || 0, lose: lose || 0, draw: draw || 0 })
    );

    return res.json({ win: win || 0, lose: lose || 0, draw: draw || 0 });
  },
  reset: (req: Request, res: Response) => {
    fs.writeFileSync(
      "./data/db.json",
      JSON.stringify({ win: 0, lose: 0, draw: 0 })
    );
    return res.json({ win: 0, lose: 0, draw: 0 });
  },
};
