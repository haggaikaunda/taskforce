const { MongoDataSource } = require("apollo-datasource-mongodb");

class Task extends MongoDataSource {
  getTask(taskId) {
    return this.findOneById(taskId);
  }

  getAllTasks() {
    return this.model.find({});
  }

  async createTask(name, isComplete) {
    try {
      const task = await this.model.create({
        name: name,
        isComplete: isComplete,
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

    await this.model.deleteOne({ _id: id }, (error, success) => {
      if (error) {
        console.log("error", error);
        return _setResponse({ succes: false, message: error.message });
      } else {
        console.log("success", success);
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
      const updatedTask = this.model.findOneAndUpdate(
        { _id: taskId },
        { $push: { notes: noteId } },
        (error, success) => {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );

      return { success: true, task: updatedTask };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
}

module.exports = Task;
