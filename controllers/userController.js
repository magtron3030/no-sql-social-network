const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

 async updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId }, 
      {$set: req.body}, 
      {runValidators: true, new: true}
      )
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},


 async deleteUser(req,res) {
  try {
    const user = await User.findOneAndDelete(
      { _id: req.params.userId }
      )
  if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }  await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
 },

 async updateFriend(req, res) {
  try {
    const friend = await User.findOneAndUpdate(
      { _id: req.params.userId }, 
      {$addToSet: { 
        friends: req.params.friendId
      }}, 
      {runValidators: true, new: true}
      )
    if (!friend) {
      return res.status(404).json({ message: 'No friend with that ID' });
    }
    res.json(friend);
  } catch (err) {
    res.status(500).json(err);
  }
},

async deleteFriend(req, res) {
  try {
    const friend = await User.findOneAndUpdate(
      { _id: req.params.userId }, 
      {$pull: { 
        friends: req.params.friendId
      }}, 
      {runValidators: true, new: true}
      )
    if (!friend) {
      return res.status(404).json({ message: 'No friend with that ID' });
    }
    res.json(friend);
  } catch (err) {
    res.status(500).json(err);
  }
},
};







