import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Auth = db.define('users',{
username: DataTypes.STRING,
password: DataTypes.STRING,
createdAt: DataTypes.DATE,
refresh_token: DataTypes.TEXT,
},{
    freezeTableName: true
});

export default Auth;

(async()=>{
    await db.sync()
})


