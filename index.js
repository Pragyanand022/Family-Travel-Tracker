import express from "express";
import bodyParser from "body-parser";
import pg from "pg";  
import env from "dotenv"

env.config();
const app = express();
const port = 3000;

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render 
  },
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;
  
// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];
 
async function checkVisisted() {
  const countryInfo = await db.query("SELECT country_code FROM visited_countries vc where vc.user_id = $1", [currentUserId]);
  const users = await db.query("select * from users ORDER BY id ASC;");
  const currentUserInfo = await db.query("select * from users where users.id = $1", [currentUserId]);
  let countries = [];
  countryInfo.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return {
    countries: countries,
    users: users.rows,
    currentUser: currentUserInfo
  };
}

app.get("/", async (req, res) => {
  const result = await checkVisisted();
  const countries = result.countries;
  const users = result.users;
  const currentUserColor = result.currentUser.rows[0].color;


  console.log(countries);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUserColor,
    currentUserId: currentUserId

  });
});

app.post("/add/:id", async (req, res) => {
  const input = req.body["country"];
  const userId = req.params.id;

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1,$2)",
        [countryCode, userId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  currentUserId = req.body.user;
  const currentUserReq = req.body.add;
  try{
    if(currentUserReq != 'new')
      res.redirect('/');
    else{
      res.render('new.ejs');
    }
  }catch(err){
    console.log(err);
  }

});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query("insert into users (name, color) values ($1,$2) returning id",[name,color]);
  currentUserId = result.rows[0].id;
  res.redirect('/');

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
