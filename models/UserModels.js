import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const user = db.define("user", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        validate: {
            isEmail: true  // Pastikan email foratnya valdi
        }
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false
         validate: {
            len: [6, 100]  // Passwordnya minimal 6 karakter
        }
    }
},{
    freezeTableName:true
});

// Hook untuk melakukan hash password sebelum menyimpan ke database
user.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

// Instance method untuk verifikasi password
user.prototype.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default user;

(async()=>{
    await db.sync();
})();
