const {Schema,model}= require('mongoose');
const { schema } = require('./user');

const commentSchema =  new Schema({
content: {
    type: String,
    required: true,
},
blogId: {
    type: Schema.Types.ObjectId,
    ref: "blog",
},
CreatedBy: {
    type: Schema.Types.ObjectId,
                ref : 'user',
},

},
{timestamp: true}
);
const Comment = model('comment',commentSchema);
module.exports = Comment;