SELECT users.id,apartments.id,user_id,users.name,complex,perroom,singleroom,gender,rent,email FROM apartments
Join users
ON users.id = apartments.user_id
