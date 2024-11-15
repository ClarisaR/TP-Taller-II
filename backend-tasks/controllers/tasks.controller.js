let tasks = [
    {
        id: 1,
        userId: 1,
        status: 'todo',
        name: "Tarea uno de clarisa",
        description: 'Una descripcion',
        date: new Date().toISOString()
    },
    {
        id: 2,
        userId: 1,
        status: 'in_progress',
        name: "Tarea dos de clarisa",
        description: 'Una descripcion',
        date: new Date().toISOString()
    },
    {
        id: 3,
        userId: 2,
        status: 'done',
        name: "Tarea de otro",
        description: 'Una descripcion',
        date: new Date().toISOString()
    }
]

const getAllTasks =  (req, res)=>{
    console.log(req.session.userId)
    const userId = req.session.userId
    const tasksUsuario = tasks.filter((tarea)=>{
        return tarea.userId == userId
    })
    res.json(tasksUsuario).end();
}

const createTask = (req,res)=>{
    
    const newTask = {
        "id": tasks.length +1,
        "userId": req.session.userId,
        "name": req.body.name,
        "description": req.body.description,
        "status": 'todo',
        "date": new Date().toISOString()
    }
    tasks.push(newTask)
    res.json(newTask)
}

const updateTask = (req, res) =>{
     const taskIndexFound =  tasks.findIndex((task)=>{
        return task.id === Number(req.params.id) && task.userId === req.session.userId
     })
     if(taskIndexFound === -1){
        return res.status(404).json({
            message: "Tarea no encontrada."
        }).end()
     }
     const updatedTask = {
        ...tasks[taskIndexFound],
        ...req.body
     }
     tasks[taskIndexFound] = updateTask
     return res.status(200).json(updatedTask).end()
}

const deleteTask = (req, res)=>{
    const taskFound = tasks.find((task)=>{
        return task.userId === req.session.userId && task.id === Number(req.params.id)
    })
    if(!taskFound){
        return res.status(404).json({
            message: "Tarea no encontrada."
        }).end()
    }
    const filteredTasks = tasks.filter((task)=>{
        return task.id !== taskFound.id
    })
    tasks = filteredTasks
    return res.status(200).json({
        message: "Tarea eliminada"
    }).end()
}

const getTask = (req, res)=>{
    const taskFound = tasks.find((task)=>{
        return task.userId === req.session.userId && task.id === Number(req.params.id)
    })
    if(!taskFound){
        return res.status(404).json({
            message: "Tarea no encontrada"
        }).end()
    }
    return res.status(200).json(taskFound).end()
}

const deleteAllTasks = (req, res)=>{
    const filteredTasks = tasks.filter(task=>{
        return task.userId !== req.session.userId
    })

    tasks = filteredTasks;
    return res.status(200).json({message: "Tareas eliminadas"})
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTask,
    deleteAllTasks
}