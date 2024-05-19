import server from "./server";
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Leaderboard application listening at http://localhost:${port}`);
});
