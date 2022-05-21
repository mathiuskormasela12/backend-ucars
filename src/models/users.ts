// ========= Users
// import all modules
import { Schema, model } from 'mongoose';

const users = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model('User', users);
