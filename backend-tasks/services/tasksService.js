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

const updateTask = async (updateData) => {

    const { id, title, description, status } = updateData.body;

    const update = await Tasks.update( {
        title,
        description,
        status
    },
    {
        where: { id }
    });

    return id;

}

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