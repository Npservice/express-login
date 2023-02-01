import {Sequelize} from "sequelize";
import db from "../config/Database.js"

const {DataTypes} = Sequelize;

const User = db.define('user',{
    nama: DataTypes.STRING,
    sekolah: DataTypes.STRING,
    hobi: DataTypes.STRING,
    createAt: DataTypes.STRING,
},{
    freezeTableName: true
});

export default User;

(async()=>{
    await db.sync()
})