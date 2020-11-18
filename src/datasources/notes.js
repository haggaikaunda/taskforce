const { MongoDataSource } = require("apollo-datasource-mongodb");

class Note extends MongoDataSource {
  getNote(taskId) {
    return this.findOneById(taskId);
  }

  getAllNotes() {
    return this.model.find({});
  }

  getNotes(noteIds) {
    return this.findManyByIds(noteIds);
  }

  createNote(taskId, description) {
    try {
      const note = this.model.create({ description, task: taskId });
      return { success: true, note: note };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
}

module.exports = Note;
