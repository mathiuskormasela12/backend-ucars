// ========= Car Models
// import all modules
import { Schema, model } from 'mongoose';

const carModels = new Schema({
  modelName: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

export default model('CarModel', carModels);
