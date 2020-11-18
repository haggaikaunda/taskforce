module.exports = {
  Query: {
    task: (_, { id }, { dataSources: { tasks } }) =>
      tasks.getTask({ taskId: id }),
    tasks: (_, __, { dataSources: { tasks } }) => tasks.getAllTasks(),
    notes: (_, __, { dataSources: { notes } }) => notes.getAllNotes(),
  },
  Mutation: {
    createTask: (_, { name, isCompleted }, { dataSources: { tasks } }) => {
      return tasks.createTask(name, isCompleted);
    },
    deleteTask: (_, { id }, { dataSources: { tasks } }) => tasks.deleteTask(id),
    createNote: (_, { taskId, description }, { dataSources: { notes } }) =>
      notes.createNote(taskId, description),
    addNoteToTask: (_, { taskId, noteId }, { dataSources: { notes } }) =>
      notes.addNoteToTask({ taskId, noteId }),
  },
};
