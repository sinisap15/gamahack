WITH rounds_played AS (
    select gps." gameId" ,sum(coalesce(" roundsPlayed",0) ) as sum_rounds from game_played_sample gps 
    group by gps." gameId"
), rounds_total as (
    select sum(sum_rounds) as total_rounds from rounds_played
), likes_per_game as (
    select " gameId", count(*) as likes from game_liked gl 
    group by gl." gameId"
), likes_total as (
    select sum(likes) as total_likes from likes_per_game
)
select distinct gl." gameId", gd.gamename AS "gameName", (lpg.likes::decimal / lt.total_likes::decimal) + (rp.sum_rounds::decimal / rt.total_rounds::decimal) AS "score"
FROM game_liked gl
JOIN game_data gd ON gd.gameid = gl." gameId"
join rounds_played rp ON rp." gameId" = gl." gameId"
join rounds_total rt on 1=1
join likes_per_game lpg on lpg." gameId" = gl." gameId"
join likes_total lt on 1=1
WHERE gl." gameId" NOT IN (
    SELECT gl2." gameId" from game_liked gl2 
    WHERE gl2."playerId" = ${playerId}
)
ORDER BY score desc
LIMIT ${pageSize};

