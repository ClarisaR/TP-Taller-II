const taskService = require("../services/tasksService");

const getAllTasks = async (req, res)=>{
    console.log(req.session.userId)
    const userId = req.session.userId

    const tasksUsuario = await taskService.getAllTasks(userId);

    console.log(tasksUsuario);

    res.json(tasksUsuario);
}

const createTask = async (req, res) => {
    try {
      const newTask = {
        User_Id: req.session.userId, // Obtén el ID del usuario autenticado desde la sesión
        status: req.body.status || false, // Asegúrate de que el estado sea un booleano
        title: req.body.title,
        description: req.body.description,
        date: new Date().toISOString()
      };
  
      const response = await taskService.createTask(newTask);
      if (response) {
        const createdTask = response.get()
        res.status(201).json({ message: 'Tarea creada', task: createdTask}); // Devuelve la nueva tarea al cliente
      } else {
        res.status(400).json({ message: "Error al cargar la tarea" });
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      res.status(500).json({ message: "Error al crear la tarea" });
    }
  };



  const updateTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req.session.userId
      const updateData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
      };
  
      // Llamada al servicio
      const response = await taskService.updateTask(userId, taskId, updateData);
  
      if (response) {
        return res.status(200).json({ message: 'Tarea actualizada', task: response });
      } else {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar la tarea'});
    }
  };
  

const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id; // Obtiene el ID de la tarea desde la URL
      const userId = req.session.userId; // Verifica que el usuario tiene permisos
  
      // Verifica si la tarea pertenece al usuario antes de eliminarla
      const taskFound = await taskService.getTaskById(taskId, userId);
      if (!taskFound) {
        return res.status(404).json({ message: "Tarea no encontrada o no autorizada." });
      }
  
      // Elimina la tarea
      const deleted = await taskService.deleteTask(taskId);
      if (deleted) {
        res.status(200).json({ message: "Tarea eliminada correctamente." });
      } else {
        res.status(400).json({ message: "No se pudo eliminar la tarea." });
      }
    } catch (err) {
      console.error("Error al eliminar la tarea:", err);
      res.status(500).json({ message: "Error interno del servidor." });
    }
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