import UserModel from "../models/UserModel.js"
import Auth from "../models/AuthModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import { render } from "ejs";

export const login = async (req,res)=>{
    try {     
        req.flash('color', 'success');
        req.flash('status', 'Yes..');
        req.flash('message', 'Registrasi berhasil');
        res.render('login',{
            layout: false,  
        })
    } catch (error) {
        console.log(error)
    }
   
}
export const register = async(req,res)=>{
    try {
        const {username, password} = req.body
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)
        const data = {
            username: req.body.username,
            password: hash
        }
        await Auth.create(data)
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}
export const verified = async (req,res)=>{
    try {
        if(!req.body.username){
             return res.status(400).json({msg: "username dan password kosong"});
            };
        const user = await Auth.findAll({
            where:{
                username: req.body.username
            }
        });
        if(user.length < 1){
           return res.status(400).json({msg: "username dan password tidak ada"});         
        }
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg : "wrong password"});
            const userId = user[0].id;
            const name = user[0].username;
            const accessToken = jwt.sign({userId,name}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId,name}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Auth.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
            req.session.loggedin = true
            res.redirect('/berhasil')

    

    } catch (error) {
        console.log(error)
    }
}
  export const berhasil = async (req,res)=>{
    res.render('berhasil',{
        layout:false
    })
  }