const Thought = require('../models/Thought');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

 async updateThought(req, res) {
  try {
    const user = await Thought.findOneAndUpdate(
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


 async deleteThought(req,res) {
  try {
    const thought = await Thought.findOneAndDelete(
      { _id: req.params.userId }
      )
  if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }  await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
 },

 async updateFriend(req, res) {
  try {
    const friend = await Thought.findOneAndUpdate(
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
    const friend = await Thought.findOneAndUpdate(
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







