const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reaction')

const thoughtSchema = new Schema (
   {
      thoughtText: {
         type: String,
         required: true,
         minLength: 1,
         maxLength: 280
      },
      createAt: {
         date: Date,
         default: Date.now,
         get: (date) => {
            if (date) return date.toString();
         }
      },
      userName: 
         {
           type: Schema.Types.ObjectId,
           ref: 'User',
           required: true
         },
      
      reactions: [
        reactionsSchema
       ],
   },
);


const Thought = model('Thought'. thoughtSchema);

module.exports = Thought;