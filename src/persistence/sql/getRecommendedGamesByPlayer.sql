SELECT gl." gameId", gd.gamename AS "gameName", COUNT(*) AS "score"
FROM game_liked gl
JOIN game_data gd ON gd.gameid = gl." gameId"
WHERE gl." gameId" NOT IN (
    SELECT gl2." gameId" from game_liked gl2 
    WHERE gl2."playerId" = ${playerId}
)
GROUP BY gl." gameId", gd.gamename
ORDER BY score desc
