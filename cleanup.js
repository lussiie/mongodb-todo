
print("====================")
print("Cleanup Started")
print("====================")

use("todoapp")


if (db.getCollectionNames().includes("todos")) {

    db.todos.drop()

    print("todos collection dropped")
}
else {
    print("todos collection does not exist")
}


print("====================")
print("Cleanup Finished")
print("====================")