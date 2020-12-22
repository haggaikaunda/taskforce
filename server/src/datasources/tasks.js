const { MongoDataSource } = require("apollo-datasource-mongodb");

class Task extends MongoDataSource {
  getTask({taskId}) {
    return this.findOneById(taskId);
  }

  getAllTasks() {
    return this.model.find({});
  }

  async createTask(name, isCompleted) {
    try {
      const task = await this.model.create({
        name: name,
        isCompleted: isCompleted,
        createdAt: Date.now()
      });
      return { success: true, task: task };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async deleteTask(id) {
    try {
      const deleteResult = await this.model.findByIdAndDelete(id);
      return { id: deleteResult._id };
    } catch (err) {
      console.log(`error while deleting task [${id}]`, err.message);
      return;
    }
  }

  async addNoteToTask({ taskId, noteId }) {
    try {
      const updatedTask = await this.model.findByIdAndUpdate(
        { _id: taskId },
        { $push: { notes: noteId } },
        { new: true }
      );
      
      return { success: true, task: updatedTask };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async editTask({ id, fields }) {
    const fieldsToUpdate = Object.fromEntries(
      // filter out undefined/null keys, this represents fields that weren't passed for editing.
      Object.entries(fields).filter((field) => {
        const value = field[1];
        return !(value === null || value === undefined);
      })
    );
    try {
      const updatedTask = await this.model.findByIdAndUpdate(
        { _id: id },
        { ...fieldsToUpdate },
        { new: true }
      );
      return updatedTask;
    } catch (err) {
      console.log("error udpating task", err);
    }
  }

  async toogleTaskCompletion({ id, isCompleted }) {
    try {
      const updatedTask = await this.model.findByIdAndUpdate(
        { _id: id },
        { isCompleted },
        { new: true }
      );
      return updatedTask;
    } catch (err) {
      console.log("error updating task", err);
    }
  }

  createdAt(id) {
    const {Schema: {Type: {ObjectId}}} = require("mongoose");
    ObjectId(id).getTimestamp()

  }
}

module.exports = Task;
