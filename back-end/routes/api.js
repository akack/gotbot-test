const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require('../config/configDB');

const User = require('../models/user.model');


mongoose.connect(db.url, {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Successfully connected to DB.');
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

router.post('/user', (req, res) => {
  let userReqData = req.body;
  User.findOne({ email: userReqData.email }, (err, userDBdata) => {
    console.log('User Data: ', userDBdata);
    if (userDBdata != undefined) {
      User.findByIdAndUpdate(userDBdata._id, userReqData, { useFindAndModify: false })
        .then(data => {
          console.log(data)
          if (!data) {
            res.set('Content-Type', 'application/json');
            res.status(404).send('Updated record not successfully.');
          } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send({ userReqData });
          }
        })
    } else {
      let user = new User(userReqData);
      user.save((error, userReqData) => {
        if (error) {
          res.set('Content-Type', 'application/json');
          res.status(404).send('Error');
          console.log("Error: ", error);
        } else {
          res.set('Content-Type', 'application/json');
          res.status(200).send({ userReqData });
        }
      });
    }
  });
});

router.get('/getUserDetails/:email', (req, res) => {
 let email = req.params.email;
  User.findOne({ email: email }, (err, result) => {
    if (result === undefined || result === null) {
      res.status(404).send(`User with this email ${email} is not registered.`);
    } else {
      res.status(200).send({ result });
    }
  });
});

module.exports = router;
