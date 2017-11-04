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
      // var queryString = `BEGIN;
      //   INSERT INTO messages (text) VALUES ('${req.body.text}');
      //   INSERT INTO users (username) VALUES ('${req.body.username}');
      //   INSERT INTO rooms (roomname) VALUES ('${req.body.roomname}');
      // COMMIT;`;

      // var queryString = 
      // `BEGIN;
      //   insert into users (username) select '${req.body.username}' from users where not exists( select username from users where username = '${req.body.username}') limit 1;
      //   insert into rooms (roomname) select '${req.body.roomname}' from rooms where not exists( select roomname from rooms where roomname = '${req.body.roomname}') limit 1;
      // COMMIT;`
      var roomId;
      var userId;

      var userString = `INSERT INTO users (username) VALUES ("${req.body.username}");`;
      db.query(userString, function (err, results) {
        if (err) {
          var userString = `select user_id from users where username = "${req.body.username}";`; 
          db.query(userString, function (err, results) {
            if (err) {
              throw err;
            } else {
              console.log('INNER ERROR :', results);
              userId = null;
            }
          });
        } else {
          console.log('OUTER ERROR: ', results);
          userId = null;
        }
      });

      var roomString = `INSERT INTO rooms (roomname) VALUES ("${req.body.roomname}");`;
      db.query(roomString, function (err, results) {
        if (err) {
          var roomString = `select room_id from rooms where roomname = "${req.body.roomname}";`;
          db.query(roomString, function (err, results) {
          });
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

module.exports.messages.post();


