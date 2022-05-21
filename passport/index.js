const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const expressSession = require("express-session")
const cors = require('cors')
const app = express()
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(expressSession({ path: '/', httpOnly: true, secret: 'keyboard cat', maxAge: null }))
app.use(passport.initialize());

// 序列化
passport.serializeUser((user, done) => {
  done(null, user)
});
// 反序列化
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      console.log(user);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));

class User {
  static findOne(user, cb) {
    let res = [{ username: 'wuyupei', password: 123456 }].find(item => {
      return item.username == user.username
    })
    cb(null, res)
  }
}

app.get('/hi', (req, res, next) => {
  res.send('hi')
})

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/hi',
}), (req, res) => {
  console.log(1111);
  res.send('ok')
})

app.listen(8000)