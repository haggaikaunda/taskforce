const { MongoDataSource } = require("apollo-datasource-mongodb");

class Task extends MongoDataSource {
  getTask(taskId) {
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
      });
      return { success: true, task: task };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async deleteTask(id) {
    let res;
    const _setResponse = (response) => {
      res = response;
      return res;
    };

    await this.model.findByIdAndDelete(id, (error, success) => {
      if (error) {
        return _setResponse({ succes: false, message: error.message });
      } else {
        if (success.deleteCount) {
          return _setResponse({ success: true });
        } else {
          return _setResponse({
            success: false,
            message: `task with id ${id} doesn't exist`,
          });
        }
      }
    });

    return res;
  }

  async addNoteToTask({ taskId, noteId }) {
    try {
      const updatedTask = await this.model.findByIdAndUpdate(
        { _id: taskId },
        { $push: { notes: noteId } },
        { new: true }
      );
      console.log("updatedTask", updatedTask);
      return { success: true, task: updatedTask };
    } catch (err) {
      return { success: false, message: err.message };
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
}

module.exports = Task;
