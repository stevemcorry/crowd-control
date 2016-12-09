create table apartments (
  id serial primary key,
  user_id integer references users(id),
  name text,
  complex text,
  perroom text,
  singleroom text,
  gender text,
  rent integer
)
create table users(
  id serial primary key,
  email text not null,
  password text,
  name text
)
create table complexes (
  id serial primary key,
  name text,
  address text,
  image text
)
