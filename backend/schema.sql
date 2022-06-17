create Type transactionType as enum ('credit','debit');



  create table if not exists users (
  id serial primary key,
  firstname text not null,
  lastname text not null,
  email text not null unique,
  password text not null,
  );

  create table if not exists transactions (
  id serial primary key,
  user_id int references users(id)
  date date not null,
  description text,
  amount bigint not null,
  category text not null,
  type transactionType not null
  );
