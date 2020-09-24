const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const todoListApp = express();

todoListApp.use(cors({ origin: true}));

todoListApp.get('/', async (req, res) => {
    const snapshot = await db.collection('todoLists').get();

    let todoLists = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        todoLists.push({id, ...data});

    });

    res.status(200).send(JSON.stringify(todoLists));

});

todoListApp.get("/:id", async (req, res) => {
    const snapshot = await db.collection('todoLists').doc(req.params.id).get();

    const todoListId = snapshot.id;
    const todoListData = snapshot.data();

    res.status(200).send(JSON.stringify({id: todoListId, ...todoListData}));
});

todoListApp.post('/', async (req, res) => {
    const todoList = req.body;

    await db.collection('todoLists').add(todoList);

    res.status(201).send();

});

todoListApp.put("/:id", async (req, res) => {
    const body = req.body;

    await db.collection('todoLists').doc(req.params.id).update({
        ...body
    });
    res.status(200).send();
});

todoListApp.delete("/:id", async (req, res) => {
    await db.collection("todoLists").doc(req.params.id).delete();

    res.status(200).send();
});


exports.todoList = functions.https.onRequest(todoListApp);
