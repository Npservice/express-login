import  Express  from "express";
import verify from "../config/Verify.js";
import { verifyToken } from "../midlleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import{
    login,
    verified,
    register,
    berhasil
} from "../controllers/UserController.js"

const router = Express.Router()

router.get('/',verify.isLogout,login)
router.post('/login',verify.isLogout,verified)
router.post('/register',verify.isLogout,register)
router.get('/token', refreshToken);
router.get('/berhasil',verify.isLogin,berhasil)
// router.get('/berhasil',berhasil)
export default router