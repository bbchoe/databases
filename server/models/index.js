var db = require('../db');

module.exports = {
  messages: {
    get: function (res) {
      // query the database
      var queryString = 'SELECT * FROM messages INNER JOIN users ON messages.user = users.user_id INNER JOIN rooms ON messages.room = rooms.room_id';

      db.query(queryString, function (err, results) {
        if (err) {
          throw err;
        }
        res.send({results: results});

      });
    }, // a function which produces all the messages
    post: function (req, res) {
      console.log('REQUEST BODY ----> ', req.body);
      var roomId;
      var userId;

      var messageQuery = function () {
        var messageString = `INSERT INTO messages (user, text, room) VALUES (${userId}, "${req.body.text}", ${roomId});`;
        console.log('MESSAGE STRING FOR MESSAGE QUERY: ', messageString);
        db.query(messageString, function (err, results) {
          if (err) {
            throw err;
          } else {
            console.log('MESSAGE QUERY RESULTS: ', results);
            res.send(results);
          }
        });        
      };
      
      var roomQuery = function () {
        var roomString = `INSERT INTO rooms (roomname) VALUES ("${req.body.roomname}");`;
        db.query(roomString, function (err, results) {
          if (err) {
            var roomString = `select room_id from rooms where roomname = "${req.body.roomname}";`;
            db.query(roomString, function (err, results) {
              if (err) {
                throw err;
              } else {
                roomId = results[0].room_id;
                messageQuery();
              }
            });
          } else {
            console.log('new room: ', results);
            roomId = results.insertId;
            messageQuery();
          }
        });
      };
      
      var userString = `INSERT INTO users (username) VALUES ("${req.body.username}");`;
      db.query(userString, function (err, results) {
        if (err) {
          var userString = 'select user_id from users where username = ?;'; 
          db.query(userString, [req.body.username], function (err, results) {
            if (err) {
              throw err;
            } else {
              userId = results[0].user_id;
              roomQuery();
            }
          });
        } else {
          userId = results.insertId;
          roomQuery();
        }        
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (req, res) {
      
    },
    post: function (req, res) {
      var userString = `INSERT INTO users (username) VALUES ("${req.body.username}");`;
      db.query(userString, function (err, results) {
        res.send(results);
      });
    }
  }
};




// module.exports.messages.post();


