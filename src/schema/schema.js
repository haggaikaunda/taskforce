const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here
  type Task {
    id: ID!
    name: String!
    notes: [Note]!
    isCompleted: Boolean!
  }

  type Note {
    id: ID!
    description: String!
    task: Task
  }

  type Query {
    tasks: [Task]!
    task(id: ID!): Task
    notes: [Note]!
  }

  type Mutation {
    createTask(name: String!, isCompleted: Boolean = false): TaskUpdateResponse!
    deleteTask(id: ID): TaskUpdateResponse!
    deleteNote(id: ID): Boolean!
    deleteAllNotes: Boolean!
    editTask(id: ID, newName: String, isCompleted: Boolean): TaskUpdateResponse!
    toogleTaskCompletion(id: ID, isCompleted: Boolean): TaskUpdateResponse!
    createNote(taskId: ID!, description: String!): NoteUpdateResponse
    addNoteToTask(taskId: ID!, noteId: ID!): TaskUpdateResponse!
  }

  type TaskUpdateResponse {
    success: Boolean!
    message: String
    task: Task
  }

  type NoteUpdateResponse {
    success: Boolean!
    message: String
    note: Note
  }
`;

module.exports = typeDefs;
