const mongoose = require("mongoose");
const user = mongoose.model("User", {
  name: {
    type: String,
  },

  lastname: {
    type: String,
  },
  age: {
    type: Number,
  },
});
module.exports = user;
