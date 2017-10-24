const pg = require("pg");
const settings = require("./settings"); // settings.json
const args = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("select * from famous_people", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...");
    search(result.rows);
    client.end();
  });
});



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