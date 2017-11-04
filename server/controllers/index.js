var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      // console.log('URL: ', req.body)
      // console.log('body: ', req.body)
      models.messages.get(res);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req, res);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

