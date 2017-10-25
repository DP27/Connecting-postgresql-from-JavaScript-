//const pg = require("pg");
const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection : settings,
});

const args = process.argv.slice(2);
console.log(args);

knex('famous_people').insert({first_name : args[0],last_name : args[1],birthdate : args[2]}).then(results => console.log(results)).catch(err => console.log(err));
knex.destroy();


