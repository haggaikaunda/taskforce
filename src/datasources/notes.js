const { MongoDataSource } = require("apollo-datasource-mongodb");

class Note extends MongoDataSource {
  getNote(noteId) {
    return this.findOneById(noteId);
  }

  getAllNotes() {
    return this.model.find({});
  }

  getNotes(noteIds) {
    return this.findManyByIds(noteIds);
  }

  async deleteAllNotes() {
    await this.model.deleteMany({}, (err) => {
      if (err) {
        console.log("err deleting notes", err);
      }
    });
    return true;
  }

  async createNote(taskId, description) {
    try {
      const note = await this.model.create({ description, task: taskId });
      return { success: true, id: note._id };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async deleteNote(id) {
    try {
      await this.model.findByIdAndDelete(id);
      return true;
    } catch (err) {
      console.log(`failed to delete note with id [${id}], got error: ${err}`);
      return false;
    }
  }
}

module.exports = Note;
