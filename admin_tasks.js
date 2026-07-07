
print("====================")
print("Admin Tasks Started")
print("====================")

use("todoapp")


print("Collections:")
printjson(db.getCollectionNames())


print("Indexes:")
printjson(db.todos.getIndexes())


print("Total todos:")
print(db.todos.countDocuments())


print("Database statistics:")
printjson(db.stats())


print("====================")
print("Admin Tasks Finished")
print("====================")