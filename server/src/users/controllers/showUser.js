const User = require('../userModel');

async function showUser(req, res) {
  try {
    const user = await User.findById(req.params.id)

      .populate('orders')
      .populate('products')
      .populate('favorites')
      .populate('address');
    res.status(200).send(user);
  } catch {
    res.status(404).json(`User with the id ${req.params.id} does not exist in the database`);
  }
}
module.exports = showUser;
