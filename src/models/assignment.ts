import { Schema, model } from "mongoose";
const assignmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  courseId: {
    type: String,
    ref: "Course",
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  file:{
    type: String
  }
});

const Assignment = model("Assignment", assignmentSchema);
export default Assignment;
