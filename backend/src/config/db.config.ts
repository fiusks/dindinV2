import * as dotenv from 'dotenv'
import {Knex,knex} from 'knex'
dotenv.config()

const config:Knex.Config={
  client: "pg",
  version: "^8.7.3",
  connection: {
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
      rejectUnauthorized: false
    },
  },

}
const knexInstance = knex(config)

export default knexInstance
