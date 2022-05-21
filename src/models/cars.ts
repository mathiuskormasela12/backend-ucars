// ========= Cars
// import all modules
import { Schema, model } from 'mongoose';

const cars = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model('Car', cars);
