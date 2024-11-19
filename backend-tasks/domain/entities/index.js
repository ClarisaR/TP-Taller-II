const Users = require('./Users');
const Tasks = require('./Tasks');

Users.hasMany(Tasks, {
    foreignKey: 'User_Id',
    as: 'Tasks'
})

Tasks.belongsTo(Users, {
    foreignKey: 'User_Id',
    as: 'User'
});

module.exports = { Users, Tasks };