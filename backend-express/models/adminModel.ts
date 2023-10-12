import { Schema } from "mongoose";
import { model } from "mongoose";

const adminSchema = new Schema({
  firstName: {
    type: String,
    max: 20,
    min: 3,
    required: true,
  },
  lastName: {
    type: String,
    max: 20,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    required: true,
    max: 40,
  },
});

const adminModel = model("Admin", adminSchema);

export default adminModel;
