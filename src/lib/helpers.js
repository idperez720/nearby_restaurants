// encryption library
const bcrypt = require('bcryptjs');

const helpers = {};


// password encryption
helpers.encryptPassword = async (password) => {

    // gen password encryption pattern
    const salt = await bcrypt.genSalt(10);

    // encrypt password
    const hash = await bcrypt.hash(password, salt);

    return hash;

};

// verify password
helpers.matchPassword = async (password, savePassword) => {
    try {
        return await bcrypt.compare(password, savePassword);
    } catch (error) {
        console.error(error);
    }
};

module.exports = helpers;