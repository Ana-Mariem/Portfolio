const express = require("express");
const path = require("path");
const app = express();
const https = require("https");

app.use(express.static("public")); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.set("view engine", "ejs"); 

let posts = [];
let name;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/index.html"));
});

// formulario de login, GET y POST
app.route("/login")
  .get((req, res) => {
    name = req.query.name;
    res.send(`Hello, ${name}. You logged in via GET.`);
  })
  .post((req, res) => {
    name = req.body.name;
    res.send(`Hello, ${name}. You logged in via POST.`);
  });

app.get("/test", (req, res) => {
    res.render("test", { name });
  });
  
//  crear un nuevo post
app.post("/new-post", (req, res) => {
  const { title, content } = req.body;
  const id = posts.length + 1;
  posts.push({ id, title, content });
  res.redirect("/home");
});


app.get("/home", (req, res) => {
  if (!name) return res.redirect("/");
  res.render("home", { name, posts });
});

// Ver post individual
app.get("/post/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  res.render("post", { post });
});

// Editar post
app.post("/edit-post/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  post.content = req.body.content;
  res.redirect("/home");
});

// Eliminar post
app.post("/delete-post/:id", (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect("/home");
});



app.listen(3000, (err) => {
  if (err) console.log("Error starting server:", err);
  else console.log("Listening on port 3000");
});
