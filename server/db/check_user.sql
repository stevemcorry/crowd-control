SELECT * FROM users
WHERE email = $1
AND password = $2
AND name ILIKE $3;
