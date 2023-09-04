//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

// const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Welcome to BlogNest, your digital destination for inspiration, information, and insight. We're on a mission to provide a nurturing platform for individuals to share their thoughts, stories, and ideas with the world. Whether you're an experienced wordsmith or just dipping your toes into the world of blogging, BlogNest is here to support your creative journey. Our community is built on the belief that every voice matters, and we strive to foster a diverse, inclusive space where meaningful discussions thrive. Join us as we explore the endless possibilities of expression, connect with like-minded individuals, and embark on a shared adventure in the world of blogging. Together, we'll make BlogNest a place where ideas take flight, and where your words find a home. Start writing your story with us today!  ";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var posts = [{title:"My first day at school",content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem perspiciatis repellat eveniet excepturi, quia labore amet ratione illo facilis deserunt minima delectus quis cupiditate expedita unde esse, fugiat architecto cumque! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, dolorem eos. Laboriosam maiores sequi nemo atque et sunt commodi totam earum dolore, eum saepe ducimus officiis quos non quaerat recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi beatae tempora distinctio obcaecati nihil dicta consequatur. Accusamus velit nisi et blanditiis, nemo pariatur quae fugit libero veniam tenetur illo id!"},
{
  title:"freshmen year", content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem perspiciatis repellat eveniet excepturi, quia labore amet ratione illo facilis deserunt minima delectus quis cupiditate expedita unde esse, fugiat architecto cumque! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, dolorem eos. Laboriosam maiores sequi nemo atque et sunt commodi totam earum dolore, eum saepe ducimus officiis quos non quaerat recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi beatae tempora distinctio obcaecati nihil dicta consequatur. Accusamus velit nisi et blanditiis, nemo pariatur quae fugit libero veniam tenetur illo id!"
}];

app.get("/", (req, res) => {
  res.render("home", {
    // content: homeStartingContent,
    posts: posts
  })
  console.log(posts);
})



app.get("/about", (req, res) => {
  res.render("about", {
    content: aboutContent
  })
})

app.get("/contact", (req, res) => {
  res.render("contact")
})

app.get("/compose", (req, res) => {
  res.render("compose")
})


app.get("/posts/:topic", (req, res) => {
  // console.log(req.params.topic);
  let found = false;

  posts.forEach((post) => {
    if (_.kebabCase(post.title) === _.kebabCase(req.params.topic)) {
      found = true
      console.log("Match found!")
      res.render("post", {
        title: post.title,
        content: post.content
      })
    }
  })
  if (!found) {
    console.log("Match not found!")
    res.redirect("/")
  }
})


app.post("/compose", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.post,
  };
  posts.push(post)
  res.redirect("/")

})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});




