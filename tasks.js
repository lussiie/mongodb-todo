
print("====================")
print("Starting Todo Tasks")
print("====================")
// Task 2.1
if (db.getCollectionNames().includes("todos")) {
    db.todos.drop()
}
db.createCollection("todos")
print("Task 2.1 completed")

db.todos.createIndex(
    { title: 1 },
    { unique: true }
)
print("Task 2.2 completed")
// Task 2.3
db.todos.createIndex({
    done: 1,
    priority: 1
})

print("Task 2.3 completed")


// Task 2.4
printjson(db.todos.getIndexes())
// Task 3.1

db.todos.insertOne({
    title: "Buy groceries",
    done: false,
    priority: "medium",
    created_at: new Date()
})

// Task 3.2

db.todos.insertMany([
{
 title:"Learn MongoDB",
 done:false,
 priority:"high",
 created_at:new Date(),
 due_date:new Date("2026-07-01")
},
{
 title:"Clean room",
 done:true,
 priority:"low",
 created_at:new Date()
},
{
 title:"Finish project",
 done:false,
 priority:"high",
 created_at:new Date(),
 due_date:new Date("2026-07-05")
},
{
 title:"Read book",
 done:true,
 priority:"medium",
 created_at:new Date()
},
{
 title:"Go shopping",
 done:false,
 priority:"low",
 created_at:new Date()
},
{
 title:"Practice JS",
 done:false,
 priority:"medium",
 created_at:new Date()
}
])


// Task 3.3

db.todos.insertMany([
{
 title:"Work meeting",
 done:false,
 priority:"high",
 tags:["work","urgent"],
 created_at:new Date()
},
{
 title:"Personal tasks",
 done:false,
 priority:"medium",
 tags:["home","study","important"],
 created_at:new Date()
}
])


// Task 3.4

db.todos.insertOne({
 title:"Build application",
 done:false,
 priority:"high",
 created_at:new Date(),
 subtasks:[
    {
     title:"Open laptop",
     done:true
    },
    {
     title:"Write code",
     done:false
    }
 ]
})
print("Total todos:")
print(db.todos.countDocuments())

// Task 4.1
printjson(db.todos.find().toArray())


// Task 4.2
printjson(db.todos.find({done:false}).toArray())
printjson(db.todos.find({priority:"high"}).toArray())


// Task 4.3

printjson(
db.todos.find({
 done:false,
 priority:"high"
}).toArray()
)


// Task 4.4

printjson(
db.todos.find({
 due_date:{
  $lt:new Date()
 }
}).toArray()
)


printjson(
db.todos.find({
 priority:{
  $in:["high","medium"]
 }
}).toArray()
)


// Task 4.5

printjson(
db.todos.find({
 title:{
  $regex:"buy",
  $options:"i"
 }
}).toArray()
)


// Task 4.6

printjson(
db.todos.find({
 tags:"work"
}).toArray()
)


printjson(
db.todos.find({
 tags:{
  $all:["work","urgent"]
 }
}).toArray()
)


// Task 4.7

printjson(
db.todos.find({
 due_date:{
  $exists:true
 }
}).toArray()
)


// Task 4.8

printjson(
db.todos.find()
.sort({created_at:-1})
.limit(3)
.toArray()
)


// Task 4.9

printjson(
db.todos.find(
{},
{
 title:1,
 priority:1,
 _id:0
}
).toArray()
)


// Task 4.10

printjson(
db.todos.find()
.skip(3)
.limit(3)
.toArray()
)

// Task 5.1

db.todos.updateOne(
{
 title:"Buy groceries"
},
{
 $set:{
  done:true
 }
})
// Task 5.2

let result =
db.todos.updateMany(
{
 priority:"high"
},
{
 $set:{
  done:true
 }
})

print("Modified:",result.modifiedCount)
// Task 5.3

db.todos.updateMany(
{},
{
 $set:{
  updated_at:new Date()
 }
})
// Task 5.5

db.todos.updateOne(
{
 title:"Work meeting"
},
{
 $addToSet:{
  tags:"important"
 }
})


// Task 5.6

db.todos.updateMany(
{},
{
 $pull:{
  tags:"urgent"
 }
})


// Task 5.7

db.todos.updateMany(
{},
{
 $set:{
  attempts:0
 }
}
)



db.todos.updateOne(
{
 title:"Buy groceries"
},
{
 $inc:{
  attempts:1
 }
}
)


// Task 5.8

db.todos.updateOne(
{
 title:"Weekly review"
},
{
 $set:{
  done:false,
  priority:"medium",
  created_at:new Date()
 }
},
{
 upsert:true
})

// Task 6.1

printjson(
db.todos.find({
 subtasks:{
  $exists:true
 }
}).toArray()
)
// Task 6.3

db.todos.updateOne(
{
 title:"Build application"
},
{
 $push:{
  subtasks:{
   title:"Test application",
   done:false
  }
 }
})
// Task 6.4

db.todos.updateOne(
{
 title:"Build application",
 "subtasks.title":"Write code"
},
{
 $set:{
  "subtasks.$.done":true
 }
}
)
// Task 7.1

db.todos.deleteOne({
 title:"Weekly review"
})


// Task 7.2

let deleted =
db.todos.deleteMany({
 done:true
})

print("Deleted:",deleted.deletedCount)
// Task 8.1

printjson(
db.todos.aggregate([
{
 $group:{
  _id:"$priority",
  count:{
   $sum:1
  }
 }
}
]).toArray()
)
// Task 8.2

printjson(
db.todos.aggregate([
{
 $group:{
  _id:"$done",
  count:{
   $sum:1
  }
 }
}
]).toArray()
)


// Task 8.3

printjson(
db.todos.aggregate([
{
 $unwind:"$tags"
},
{
 $group:{
  _id:"$tags",
  count:{
   $sum:1
  }
 }
}
]).toArray()
)


print("====================")
print("ALL TASKS FINISHED")
print("====================")