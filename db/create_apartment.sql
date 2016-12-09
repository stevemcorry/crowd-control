INSERT INTO apartments (user_id, name , complex , perRoom , singleRoom , gender,rent)
VALUES ($1, $2 , $3, $4, $5, $6, $7)
RETURNING *;
