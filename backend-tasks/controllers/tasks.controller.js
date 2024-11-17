let tasks = [
    {
        id: 1,
        userId: 1,
        status: 'todo',
        name: "Tarea 1 de clarisa",
        description: 'Una descripcion',
        date: new Date().toISOString()
    },
    {
        id: 2,
        userId: 1,
        status: 'in_progress',
        name: "Tarea 2 de clarisa",
        description: 'Una descripcion',
        date: new Date().toISOString()
    },
    {
        id: 3,
        userId: 2,
        status: 'done',
        name: "Tarea 1 de Rama",
        description: 'Una descripcion',
        date: new Date().toISOString()
    },
    {
        id: 4,
        userId: 1,
        status: 'in_progress',
        name: "Tarea 3 de clarisa",
        description: 'Una descripcion',
        date: new Date().toISOString()
    },
    {
        id: 5,
        userId: 2,
        status: 'in_progress',
        name: "Tarea 2 de Rama",
        description: 'Una descripcion',
        date: new Date().toISOString()
    },
    {
        id: 6,
        userId: 2,
        status: 'in_progress',
        name: "Tarea 3 de Rama",
        description: 'Una descripcion',
        date: new Date().toISOString()
    },
    {
        id: 7,
        userId: 1,
        status: 'in_progress',
        name: "Tarea 4 de clarisa",
        description: 'Una descripcion',
        date: new Date().toISOString()
    },
    {
        id: 8,
        userId: 2,
        status: 'in_progress',
        name: "Tarea 4 de Rama",
        description: 'Una descripcion',
        date: new Date().toISOString()
    },

]

const getAllTasks =  (req, res)=>{
    console.log(req.session.userId)
    const userId = req.session.userId
    const tasksUsuario = tasks.filter((tarea)=>{
        return tarea.userId == userId
    })
    res.json(tasksUsuario).end();
}

const createTask = (req, res) => {
    console.log('Datos recibidos:', req.body); // Verifica los datos enviados desde el frontend
    const newTask = {
        id: tasks.length + 1,
        userId: req.session.userId,
        status: 'todo',
        name: req.body.name,
        description: req.body.description,
        date: new Date().toISOString()
    };

    tasks.push(newTask); // Agregar la tarea a la lista
    console.log('Nueva tarea agregada:', newTask); // Verifica la nueva tarea
    res.status(201).json(newTask); // Devuelve la nueva tarea al cliente
};


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
const deleteTask = (req, res) => {
    const taskFound = tasks.find((task) => {
        return task.userId === req.session.userId && task.id === Number(req.params.id);
    });

    if (!taskFound) {
        return res.status(404).json({
            message: "Tarea no encontrada."
        }).end();
    }

    tasks = tasks.filter((task) => task.id !== taskFound.id); 

    return res.status(200).json({
        message: "Tarea eliminada"
    }).end();
};


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