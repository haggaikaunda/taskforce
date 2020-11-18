const mongo = require("mongoose");

const NoteSchema = new mongo.Schema({
  description: String,
  task: {
    type: mongo.Schema.Types.ObjectId,
    ref: "Task",
    autopopulate: true,
  },
});

NoteSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongo.model("Note", NoteSchema);
