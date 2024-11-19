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

    /*


const deleteTask =
const getTask =
const deleteAllTasks = */

module.exports = {
    getAllTasks,
    createTask,
    updateTask
}