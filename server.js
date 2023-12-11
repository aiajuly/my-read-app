if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const path = require('path');
const methodOverride = require('method-override');
const express = require('express');
const mongoose = require('mongoose');
const {AppError} = require('./utils/errors/errors')

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const session = require('express-session');
const flash = require('connect-flash');

const bookRouter = require('./routers/books')
const commentRouter = require('./routers/comments')
const userRouter = require('./routers/users');

const connectMongo = require('connect-mongo');

const app = express();


mongoose.connect('mongodb://localhost:27017/myReadDB');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


const sessionStore = connectMongo.create({
  mongoUrl: 'mongodb://localhost:27017/myReadDB',
  touchAfter: 24 * 60 * 60, 
  crypto: {
      secret: process.env.SESSION_SECRET
  }
});
sessionStore.on("error", function (e) {
  console.log("SESSION STORE ERROR", e)
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
  store: sessionStore,
  name: 'session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// implement the loocal starategy to the user witch has and authenticate()
passport.use(new LocalStrategy(User.authenticate()));
// serialization refers to how to store data in the session
passport.serializeUser(User.serializeUser());
// deserialization is the opposite
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})




app.get('/home', (req, res) => {
  res.render('pages/home', {title: 'Home'})
})

app.get('/about', (req,res) => {
  res.render('pages/about', {title: 'About'})
})

app.use('/books', bookRouter);
app.use('/books', commentRouter);
app.use('/', userRouter);




app.get("/*", (req, res) =>{
  throw new AppError("Page Not Found", 404);
});


app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).render('pages/error', {message, status, title: "Error"});
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});









