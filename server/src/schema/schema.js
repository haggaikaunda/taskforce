const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here
  type Task {
    id: ID!
    name: String!
    notes: [Note]!
    isCompleted: Boolean!
    createdAt: String
  }

  type Note {
    id: ID!
    description: String!
    task: Task
    noteType: NoteType
    createdAt: String
  }

  enum NoteType {
    COMMENT
    SUBTASK
  }

  type Query {
    tasks: [Task]!
    task(id: ID!): Task
    notes: [Note]!
  }

  type Mutation {
    createTask(name: String!, isCompleted: Boolean = false): TaskUpdateResponse!
    deleteTask(id: ID): Task
    deleteNote(id: ID): Boolean!
    deleteAllNotes: Boolean!
    editTask(id: ID, name: String, isCompleted: Boolean): Task
    createNote(taskId: ID!, description: String!, as: NoteType = "SUBTASK"): NoteUpdateResponse
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
