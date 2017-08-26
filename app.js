let express = require('express');
let app = express();

let pgp = require('pg-promise')();
let mustacheExpress = require('mustache-express');
let bodyParser = require('body-parser');
let axios = require('axios');

const path = require('path');
app.engine('html', mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/public");
// app.use("/", express.static(__dirname + "/views"));

app.use('/public', express.static(path.join(__dirname, '/public/assets')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, function(){
  console.log("server is listening")
})

app.get("/pet", function(req, res){
  axios.get("https://api.petfinder.com/pet.getRandom?key=402d3f8b4c52d0fd052d8030dd0b5d41&output=full&format=json")
  .then((response )=> {
    let pet = {
      name: response.data.petfinder.pet
    }
    res.send(pet);
  })
  .catch((err) => {
    console.log(err);
  });
})

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './public', 'index.html'));
});
