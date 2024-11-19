const User = require("../domain/entities/Users");

const getUser = async (username, password) => {
    try {
        const user = await User.findOne({
            where: {
                username: username,
                password: password,
            },
        });

        return user;
    }catch (error) {
        return undefined;
    }
};

const createUser = async (data) => {

    const { username, password } = data;
    console.log(data);
    const existingUser = await User.findOne({ where: { username } });
    console.log("Response DB: " +  existingUser);
    if (existingUser != undefined) {
        throw new Error('El nombre de usuario ya está en uso');
    }

    const newUser = new User({
        username,
        password
    });

    await newUser.save();

    return newUser;
};

module.exports = {
    createUser,
    getUser
}