const Thought = require('../models/Thought');
const User = require('../models/User')


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
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: dbThoughtData._id } },
        {new: true}
      );

      if(!user){
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }
      res.json('The thought was created!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

 
 
 async updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      {$set: req.body}, 
      {runValidators: true, new: true}
      )
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},


 async deleteThought(req,res) {
  try {
    const thought = await Thought.findOneAndDelete(
      { _id: req.params.thoughtId }
      )
  if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
 },




 async updateReaction(req, res) {
  try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      {$addToSet: { 
        reactions: req.body
      }}, 
      {runValidators: true, new: true}
      )
    if (!reaction) {
      return res.status(404).json({ message: 'No reaction with that ID' });
    }
    res.json(reaction);
  } catch (err) {
    res.status(500).json(err);
  }
},

async deleteReaction(req, res) {
  console.log(req.params)
  try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      {$pull: { 
        reactions: {reactionid: req.params.reactionid
      }}}, 
      {runValidators: true, new: true}
      )
    if (!reaction) {
      return res.status(404).json({ message: 'No reaction with that ID' });
    }
    res.json(reaction);
  } catch (err) {
    res.status(500).json(err);
  }
},
};







