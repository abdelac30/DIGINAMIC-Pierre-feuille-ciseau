export const GenerateRandomMove = () => {
  const moves = ["pierre", "feuille", "ciseaux"];
  return moves[Math.floor(Math.random() * moves.length)];
};
