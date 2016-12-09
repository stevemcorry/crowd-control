SELECT u.id,a.id,user_id,u.name,complex,perroom,singleroom,gender,rent,email,image
FROM apartments a
left Join complexes c
ON a.complex = c.name
Join users u
ON a.user_id = u.id
