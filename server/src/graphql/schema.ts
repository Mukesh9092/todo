import { gql } from "apollo-server-express";

const schema = gql`
  scalar DateTime

  type Todo {
    id: ID!
    description: String!
    done: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Cursor {
    beforeCursor: String
    afterCursor: String
  }

  type Todos {
    data: [Todo!]!
    cursor: Cursor!
  }

  enum CursorType {
    AFTER
    BEFORE
  }

  input CursorInput {
    cursor: String!
    type: CursorType!
  }

  enum PaginationOrder {
    ASC
    DESC
  }

  input PaginationInput {
    limit: Int
    cursor: CursorInput
    order: PaginationOrder
  }

  type Query {
    getTodo(id: ID!): Todo
    listTodos(input: PaginationInput): Todos
  }

  input CreateTodoInput {
    description: String!
    userId: String!
  }

  input UpdateTodoInput {
    description: String!
    done: Boolean!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  type Mutation {
    signUp(input: SignUpInput!): String!
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Boolean!
  }

  type TodoEvent {
    id: ID!
    todo: Todo
  }

  type Subscription {
    onTodoEvent: TodoEvent!
  }
`;

export default schema;
