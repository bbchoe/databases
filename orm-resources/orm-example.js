/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chatter', 'student', 'student');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
 
db
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
  
var User = db.define('User', {
  userid: Sequelize.INTEGER,
  username: Sequelize.STRING
});

var Room = db.define('Room', {
  roomid: Sequelize.INTEGER,
  roomname: Sequelize.STRING
});

var Message = db.define('Message', {
  username: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.INTEGER
});


/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
 
User.sync()
  .then(function() {
    // Now instantiate an object and save it:
    return User.create({username: 'Jean Valjean'});
  })
  .then(function() {
    // Retrieve objects from the database:
    return User.findAll({ where: {username: 'Jean Valjean'} });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.username + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });

Room.sync()
  // .then(function() {
  //   // Now instantiate an object and save it:
  //   return Room.create({roomname: 'Jean Valjean'});
  // })
  // .then(function() {
  //   // Retrieve objects from the database:
  //   return Room.findAll({ where: {roomname: 'Jean Valjean'} });
  // })
  // .then(function(rooms) {
  //   rooms.forEach(function(room) {
  //     console.log(room.roomname + ' exists');
  //   });
  //   db.close();
  // })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });