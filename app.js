let express = require('express');
let app = express();
let pgp = require('pg-promise')();
let mustacheExpress = require('mustache-express');
let bodyParser = require('body-parser');

app.engine('html', mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('hello world')
})

app.listen(3000, function(){
  console.log("server is listening")
})

let db = pgp('postgres://Lukepate@localhost:5432/creatures_db');


app.get("/creatures", function(req, res){
   db
    .any("SELECT * FROM creatures")
    .then(function(data){
      let view_data = {
        creatures:data
      };
      res.render("creatures/index", view_data);
    })
  });

app.get("/creatures", function(req, res){
   db
    .any("SELECT * FROM creatures")
    .then(function(data){
      let view_data = {
        creatures:data
      };
      res.render("creatures/planets", view_data);
    })
  });

app.get("/creatures/:id", function(req, res){
  let id = req.params.id;
   db
    .one("SELECT * FROM creatures WHERE id = $1", [id])
    .then(function(data){
      let view_data = {
        name: data.planet,
        species: data.species
      };
      res.render("creatures/planets", view_data);
    })
  });


app.post('/creatures', function(req, res){
  let new_creature = req.body;
  db.none("INSERT INTO creatures (species, family, habitat, diet, planet) VALUES ($1, $2, $3, $4, $5)",
    [new_creature.species, new_creature.family, new_creature.habitat, new_creature.diet, new_creature.planet])
  .then(function(){
  res.redirct("/creatures");
  });
});

app.get('/creature/new', function(req, res){
      res.render('creatures/new')
  });

app.put("/", function(req, res){
  species = req.body.species
   db.one("insert into creatures(species) values($1) returning id", [species])
   .then(data => {
  res.redirect("/creatres")
    })
 })


