import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import { validateData } from "./middleware/validationMiddleware.js";
import { partialTodoSchema, todoSchema } from "./schemas/todo.js";
// const logger = require("firebase-functions/logger");

initializeApp();

const app = express();

app.get("/", async (_req, res) => {
  const db = getFirestore();
  const busca = _req.query.busca
  let query = db.collection("todos");
  if (busca) {
    query = query.where('text', '>=', busca).where('text', '<=', busca + '\uf8ff');
  }
  const querySnapshot = await query.get();
  const docs = querySnapshot.docs.map((value) => ({
    id: value.id,
    ...value.data(),
  }));
  res.status(200).send(docs);
});

app.post("/", validateData(todoSchema), async (req, res) => {
  const db = getFirestore();
  const docReference = await db.collection("todos").add(req.body);
  res.status(201).send({ id: docReference.id });
});

app.delete("/:id", async (req, res) => {
  const db = getFirestore();
  const id = req.params.id;
  await db.collection("todos").doc(id).delete();
  res.sendStatus(200);
});

app.patch("/:id", validateData(partialTodoSchema), async (req, res) => {
  const db = getFirestore();
  const id = req.params.id;
  await db.collection("todos").doc(id).update(req.body);
  res.sendStatus(200);
});

export const api = onRequest(app);
