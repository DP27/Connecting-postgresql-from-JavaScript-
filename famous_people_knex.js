//const pg = require("pg");
const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection : settings,
});

const args = process.argv.slice(2);


var result = knex.select('').from('famous_people').then(results => search(results)).catch(err => console.log(err));
//console.log(result);



function search(result){
  let found = 0;
  result.forEach(function(row){
      if(args == row.first_name || args == row.last_name){
        found += 1;
        console.log("Found "+`${found}`+" person(s) by the name"+" "+`${String(args)}:`);
        console.log("- "+`${row.id}`+":"+`${row.first_name} `+`${row.last_name}`+", "+"born on "+ `${row.birthdate}`);
        return;
      }
    })
  if (found == 0){
  console.log("Found "+`${found}`+" person(s) by the name"+" "+`${String(args)}:`);
  return;
  }
}