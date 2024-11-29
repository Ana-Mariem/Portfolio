const express = require("express");
const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://0253219:f95NhiTlno5pJLY1@cluster0.c0vny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("Error connecting to MongoDB Atlas", err));
const csvParser = require("csv-parser");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Schemas
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

// Middleware to load data from CSV on root path
app.use(async (req, res, next) => {
  try {
    if ((await Team.countDocuments()) === 0 && (await Driver.countDocuments()) === 0) {
      const teams = [];
      const drivers = [];

      fs.createReadStream("public/data/f1_2023.csv")
        .pipe(csvParser())
        .on("data", (row) => {
          const team = { id: row.team_id, name: row.team, nationality: row.team_nationality, url: row.team_url };
          if (!teams.find((t) => t.id === team.id)) {
            teams.push(team);
          }
          drivers.push({
            num: row.num,
            code: row.code,
            forename: row.forename,
            surname: row.surname,
            dob: row.dob,
            nationality: row.nationality,
            url: row.url,
            team,
          });
        })
        .on("end", async () => {
          await Team.insertMany(teams);
          await Driver.insertMany(drivers);
          console.log("Data successfully loaded into the database.");
          next();
        });
    } else {
      next();
    }
  } catch (err) {
    console.error("Error loading data:", err);
    next(err);
  }
});

app.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    const drivers = await Driver.find();
    res.render("index", { teams, drivers, countries });
  } catch (err) {
    res.status(500).send("Error loading data.");
  }
});

app.post("/driver", async (req, res) => {
  try {
    const { num, code, name, lname, dob, nation, url, team } = req.body;
    const teamData = await Team.findOne({ name: team });
    if (!teamData) {
      return res.status(400).send("Invalid team.");
    }

    const driver = new Driver({
      num,
      code,
      forename: name,
      surname: lname,
      dob,
      nationality: nation,
      url,
      team: teamData,
    });

    await driver.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error saving driver.");
  }
});

const countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
