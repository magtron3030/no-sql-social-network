const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema (
   {
      reactionId: {
         type: Schema.Types.ObjectId,
         default: () => new Types.ObjectId(),
      },
      reactionBody: {
         type: String,
         required: true,
         maxlength: 280,
      },
      userName: 
         {
           type: String,
           required: true
         },
      
      createdAt: {
      date: Date,
      default: Date.now,
      get: (date) => {
         if (date) return date.toString();
      }
   },
});


module.exports = reactionSchema;