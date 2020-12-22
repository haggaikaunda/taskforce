const mongo = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema/schema");

const TaskModel = require("./models/taskModel");
const NoteModel = require("./models/noteModel");
const Tasks = require("./datasources/tasks");
const Notes = require("./datasources/notes");
const resolvers = require("./schema/resolvers");

let MONGO_URI
MONGO_URI = process.env.MONGO_URI;

// TODO: Find a better way to do this.
if (!MONGO_URI) {
  const dotenv = require("dotenv")
  dotenv.config()
  MONGO_URI = process.env.MONGO_URI
}

const mongoUri = `${MONGO_URI}?retryWrites=true&w=majority`;

mongo.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongo.connection.once("open", () => {
  console.log("connected to database");
});

mongo.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    tasks: new Tasks(TaskModel),
    notes: new Notes(NoteModel),
  }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
