const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reaction')

const thoughtSchema = new Schema (
   {
      thoughttext: {
         type: String,
         required: true,
         minLength: 1,
         maxLength: 280
      },
      username: 
         {
           type: String,
           required: true
         },
      
      reactions: [
        reactionsSchema
       ],
   },
   {
      timestamps: true
   }
   );

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;