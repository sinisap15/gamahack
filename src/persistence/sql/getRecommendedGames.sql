SELECT gl." gameId", gd.gamename AS "gameName", COUNT(*) AS "score"
FROM game_liked gl
JOIN game_data gd ON gd.gameid = gl." gameId"
GROUP BY gl." gameId", gd.gamename
ORDER BY score desc
LIMIT ${pageSize}
;