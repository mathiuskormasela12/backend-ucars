// ========= Cars Model
// import all modules
import { Schema, model } from 'mongoose';

const cars = new Schema({
  name: {
    type: String,
    required: true,
  },
  carModelId: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

export default model('Car', cars);
