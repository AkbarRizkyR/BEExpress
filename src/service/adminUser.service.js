const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repository = require('../repository/adminUser.repository');
const AdminUserDTO = require('../dto/adminUser.dto');


const SECRET_KEY = process.env.JWT_SECRET;

const register = async (username, password) => {
    const existing = await repository.findByUsername(username);
    if (existing) throw new Error('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await repository.createAdminUser(username, hashedPassword);

    return new AdminUserDTO(user);
};

const login = async (username, password) => {
    const user = await repository.findByUsername(username);
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: '6h' } // ⏰ Expired dalam 6 jam
    );

    return { token };
};

module.exports = {
    register,
    login,
};
