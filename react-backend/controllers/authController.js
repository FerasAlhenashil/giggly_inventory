const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'aSecritveSecret'

exports.getLogin = (req, res, next) => {
  console.log('in get login')
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.getSignup = (req,res,next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const loginPassword = req.body.password;
  console.log('post log session', username, loginPassword)
    User.findById(username) // database query
      .then(user => {
        if (!user[0]){
          console.log('no username')
          return res.status(401)
          .json({
            error:'Incorrect email or password'
          });
        }
        //console.log('za pass', user[0].password)
        bcrypt.compare(loginPassword, user[0].password)
        .then(doMatch => {
          console.log('loginPassword',loginPassword)
          console.log('DBpassword', user[0].password)
          console.log(doMatch)
          if (!doMatch){
            console.log('they don\'t match')
            res.status(401)
            .json({
              error:'Incorrect email or password'
            });
          } else {
            const payload = { username };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });  
            res.cookie('token', token, { httpOnly: true }).sendStatus(200);
          }
        })
        .catch(err => {
          console.log(err);
          res.redirect('/');
        })
        
      })
      .catch(err => console.log(err));
  };
  
  exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
      .then(userDoc => {
        if (userDoc) {
          return res.redirect('/signup');
        }
        return bcrypt.hash(password, 12);
        
      })
      .then(hashedPassword => {
        const user = new User({
          email: email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then(result => {
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  exports.postLogout = (req, res, next) => {
    console.log('in post logout')
    res.cookie('token', 'deleted', { httpOnly: true }).sendStatus(200);
  };
