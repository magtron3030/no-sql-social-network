const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema (
   {
      reactionid: {
         type: Schema.Types.ObjectId,
         default: () => new Types.ObjectId(),
      },
      reactionbody: {
         type: String,
         required: true,
         maxlength: 280,
      },
      username: 
         {
           type: String,
           required: true
         },
      
   //    createdat: {
   //    date: Date,
   //    default: new Date,
   //    get: (date) => {
   //       if (date) return date.toString();
   //    }
   // },
},
{
   timestamps: true
}
);


module.exports = reactionSchema;