// pada dasarnya mongodb struktur fieldnya bebas, maka disini peran mongoose untuk menentukan ketentuan field di mongodb agar mirip sql

const { model, Schema } = require('mongoose');
const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    // field dapat diisi dengan array
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    // konsepnya mirip belongsto
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);