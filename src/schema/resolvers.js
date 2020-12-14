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
    deleteTask: async (_, { id }, { dataSources: { tasks } }) =>
      await tasks.deleteTask(id),

    editTask: (_, { id, name, isCompleted }, { dataSources: { tasks } }) =>
      tasks.editTask({ id, fields: { name, isCompleted } }),

    createNote: async (
      _,
      { taskId, description },
      { dataSources: { notes, tasks } }
    ) => {
      const noteCreateResult = await notes.createNote(taskId, description);
      if (noteCreateResult.success) {
        // add this note to the corresponding task.
        await tasks.addNoteToTask({
          taskId: taskId,
          noteId: noteCreateResult.id,
        });

        // now fetch the note with it's updated task from db.
        return {
          success: noteCreateResult.success,
          note: notes.getNote(noteCreateResult.id),
        };
      }
      // failed to create the note, short circult.
      return noteCreateResult;
    },

    // perhaps we don't need this??
    addNoteToTask: (_, { taskId, noteId }, { dataSources: { tasks } }) =>
      tasks.addNoteToTask({ taskId, noteId }),

    deleteNote: (_, { id }, { dataSources: { notes } }) => notes.deleteNote(id),
    deleteAllNotes: (_, __, { dataSources: { notes } }) =>
      notes.deleteAllNotes(),
  },
};
