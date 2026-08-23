import "dotenv/config";

import { PrismaClient } from "./generated/prisma/client.js";

import { PrismaPg } from "@prisma/adapter-pg";

import express from "express";

const app = express();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function createUser() {
  const user = await prisma.user.create({
    data: {
      username: "test",
      password: "1234",
      age: 20,
      city: "pune"
    },
  });

  console.log(user);
}

async function createTodo(userId: number, title: string, description: string) {
  const todo = await prisma.todo.create({
    data: {
      userId: userId,
      title: title,
      description: description,
      done: false
    },
  });

  console.log(todo);
}

async function getTodos(userId: number) {
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId
    },
  });

  console.log(todos);
}

async function getTodosAndUserDetails(userId: number) {
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId
    },
    include: {
      user: true
    },
  });

  console.log(todos);
}

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json({
    users
  });
});

app.get("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);

  const user = await prisma.user.findFirst({
    where: {
      id: id
    },
    select: {
      todos: true
    }
  });

  res.json({
    user
  });
});

createUser();

createTodo(1, "go to gym", "go to gym and do 10 pushups");

getTodos(1);

getTodosAndUserDetails(1);