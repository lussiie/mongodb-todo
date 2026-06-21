// setup.js
// Author: Lusine

print("====================")
print("Todo App Setup Started")
print("====================")

use("todoapp")

print("Connected to todoapp")


printjson(db.getUsers())


db.createCollection("todos")

print("todos collection created")


db.todos.createIndex(
    { title: 1 },
    { unique: true }
)

print("unique index created")


db.todos.createIndex({
    done: 1,
    priority: 1
})

print("compound index created")

printjson(db.todos.getIndexes())

print("Setup finished")