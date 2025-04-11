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
), target_player_games AS ( -- igre ki jih igra izbrani igralec
  SELECT " gameId"
  FROM game_liked
  WHERE "playerId" = ${playerId}
),
similar_players AS ( -- igralci, ki imajo polajkane iste igre kot izbrani igralec
  SELECT DISTINCT "playerId"
  FROM game_liked
  WHERE " gameId" IN (SELECT " gameId" FROM target_player_games)
    AND "playerId" != ${playerId}
),
candidate_games AS ( -- igre, ki so polajkane od podobnih igralcev ampak ne od izbranega igralca
  SELECT " gameId"
  FROM game_liked
  WHERE "playerId" IN (SELECT "playerId" FROM similar_players)
    AND " gameId" NOT IN (SELECT " gameId" FROM target_player_games)
),
ranked_recommendations AS ( -- sestevek lajkov "podobnih igralcev"
  SELECT " gameId", COUNT(*) AS like_count
  FROM game_liked
  WHERE " gameId" IN (SELECT " gameId" FROM candidate_games)
  GROUP BY " gameId"
  ORDER BY like_count DESC
)
select distinct gl." gameId", gd.gamename AS "gameName", 
(lpg.likes::decimal / lt.total_likes::decimal) + 
(rp.sum_rounds::decimal / rt.total_rounds::decimal) +
(coalesce(rr.like_count::decimal,0) / lt.total_likes::decimal)
AS "score"
FROM game_liked gl
JOIN game_data gd ON gd.gameid = gl." gameId"
join rounds_played rp ON rp." gameId" = gl." gameId"
join rounds_total rt on 1=1
join likes_per_game lpg on lpg." gameId" = gl." gameId"
join likes_total lt on 1=1
left join ranked_recommendations rr on rr." gameId" = gl." gameId"
WHERE gl." gameId" NOT IN (
    SELECT gl2." gameId" from game_liked gl2 
    WHERE gl2."playerId" = ${playerId}
)
ORDER BY score desc
LIMIT ${pageSize};

