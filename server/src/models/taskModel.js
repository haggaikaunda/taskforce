const mongo = require("mongoose");

const TaskSchema = new mongo.Schema({
  name: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
  notes: {
    type: [mongo.Schema.Types.ObjectId],
    ref: "Note",
    autopopulate: true,
  },
});

TaskSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongo.model("Task", TaskSchema);
