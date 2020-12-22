const mongo = require("mongoose");

const NoteSchema = new mongo.Schema({
  description: String,
  noteType: {
    type: String,
    enum: ["COMMENT", "SUBTASK"],
  },
  createdAt: {
    type: String
  },
  task: {
    type: mongo.Schema.Types.ObjectId,
    ref: "Task",
    autopopulate: true,
  },
});

NoteSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongo.model("Note", NoteSchema);
