const User = require('../models/user.model');

async function showUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch {
    res.status(404).json(`User with the id ${req.params.id} does not exist in the database`);
  }
}
module.exports = showUser;