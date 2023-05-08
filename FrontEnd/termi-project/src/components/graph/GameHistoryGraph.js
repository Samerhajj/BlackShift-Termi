import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend } from "recharts";
import GameHistoryAPI from "../../api/GameHistoryAPI";

const gameColors = {
  "Memory Game": "blue",
  "Backward": "red",
  "Hangman": "green",
};

function GameHistoryGraph() {
  const [gamesData, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState("");
  

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    const res = await GameHistoryAPI.getGameHistory();

    if (!res.body || !res.body.games || res.body.games.length === 0) {
      // handle the case where there are no game data
      setGamesData([]);
      setIsLoading(false);
      return;
    }

    const gamesData = res.body.games;
    console.log(res.body.games);
    // Create an object to store gameName and their corresponding scores
    const gamesScores = {};
    gamesData.forEach((game) => {
      if (gamesScores[game.gameName]) {
        gamesScores[game.gameName].push(game.score);
      } else {
        gamesScores[game.gameName] = [game.score];
      }
    });

    // Format the data for Recharts
    const chartData = Object.entries(gamesScores).map(([gameName, scores]) => ({
      gamelabel: gameName,
      score: scores,
    }));

    setGamesData(chartData);
    setIsLoading(false);
  }

    const filteredGamesData = selectedGame
      ? gamesData.filter((game) => game.gamelabel === selectedGame)
      : gamesData;

  const chartData = filteredGamesData.reduce(
    (acc, { gamelabel, score }) =>
      score.map((value, i) => ({ x: i + 1, [gamelabel]: value, ...acc[i] || {} })),
    []
  );

  return (
    <div className="GameHistory">
      <h2>Game History</h2>
       <div className="d-flex flex-wrap justify-content-center gap-3">
      <div className="form-floating" dir="ltr">
                            <select 
                                id="gameSelect"
                                className="selectpicker show-menu-arrow form-select mb-2 pb-1"
                                data-style="btn-primary"
                                title="Game"
                                value={selectedGame}
                                onChange={(e)=>{setSelectedGame(e.target.value)}}>
                                <option value="">All Games</option>
                                {
                                    gamesData.map((game) => {
                                    return (
                                        <option key={game.gamelabel} value={game.gamelabel}>{game.gamelabel}</option>
                                    )})
                                }
                            </select>
                            <label htmlFor="gameSelect">Game</label>
                        </div>
                       
                        </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={500}>
         <LineChart
            margin={{ top: 30, bottom: 50, left: 30, right: 30 }}
            data={chartData}
          >
            <XAxis 
            dataKey="x" 
            label={{ value: "Game Number", position: "insideBottom", dy: 10 }} 
            />
            <YAxis 
            label={{ value: "Score", angle: -90, position: "insideLeft" }} 
            scale="pow" exponent={0} 
            domain={[0, 10]} />
          <Legend
              wrapperStyle={{ margin: '0 0 -10px 0' }}
              align="center"
              verticalAlign="bottom"
              iconSize={10}
              height={36}
            />

            {filteredGamesData.map((game) => (
              <Line
                key={game.gamelabel}
                dataKey={game.gamelabel}
                stroke={gameColors[game.gamelabel]}
                strokeWidth={2}
                dot={{ stroke: gameColors[game.gamelabel], strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default GameHistoryGraph;
