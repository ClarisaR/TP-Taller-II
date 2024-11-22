const { Users, Tasks} = require("../domain/entities");

const getAllTasks =  async (User_Id) => {
    return await Tasks.findAll({where: {User_Id}});
}

const createTask = async (task) => {
    try {
      const newTask = await Tasks.create(task);
      return newTask;
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      return null;
    }
  };

  const updateTask = async (userId, taskId, updateData) => {

    try {
      const currentTask = await Tasks.findOne({where: {id: taskId, User_Id: userId}})
      if(!currentTask){
        throw new Error("Tarea no encontrada");
      }
      const hasChanges = Object.keys(updateData).some(key=>{
        return updateData[key] !== currentTask[key]
      })

      if(!hasChanges){
        return true;
      }
      const [updated] = await Tasks.update(updateData, {
        where: { User_Id: userId, id: taskId }
      });
  
      if (updated) {
        const updatedTask = await Tasks.findOne({ where: { id: taskId } });
        return updatedTask;
      }
      throw new Error('Tarea no encontrada');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      return null;
    }
  };
  

const getTaskById = async (id, userId) => {
    return await Tasks.findOne({ where: { id, User_Id: userId } });
  };
  
  const deleteTask = async (id) => {
    try {
      const result = await Tasks.destroy({ where: { id } });
      return result > 0; // Devuelve `true` si se eliminó, `false` si no
    } catch (err) {
      console.error("Error al eliminar la tarea:", err);
      return false;
    }
  };

    /*


const deleteTask =
const getTask =
const deleteAllTasks = */

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    getTaskById,
    deleteTask
}