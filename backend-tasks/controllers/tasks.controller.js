const taskService = require("../services/tasksService");

const getAllTasks = async (req, res)=>{
    console.log(req.session.userId)
    const userId = req.session.userId

    const tasksUsuario = await taskService.getAllTasks(userId);

    console.log(tasksUsuario);

    res.json(tasksUsuario);
}

const createTask = (req, res) => {
    console.log('Datos recibidos:', req.body); // Verifica los datos enviados desde el frontend
    const newTask = {
        userId: req.session.userId,
        status: 'To Do',
        name: req.body.name,
        description: req.body.description,
        date: new Date().toISOString()
    };

    const response = taskService.createTask(newTask);

    if(response){
        console.log('Nueva tarea agregada:', newTask); // Verifica la nueva tarea

        res.status(201).json(newTask); // Devuelve la nueva tarea al cliente
    }else {
        res.status(400).message("Error al cargar la tarea");
    }
};

const updateTask = async (req, res) =>{

    const updateData = {
         id: req.params.id,
         title: req.body.title,
         description: req.body.description,
         status: req.body.status
    }

    const response = await taskService.updateTask(updateData);

    return res.status(200).json(response);
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