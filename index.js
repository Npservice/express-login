import Express  from "express";
import dotenv from "dotenv";
import expressEjsLayouts from "express-ejs-layouts";
import router from "./routes/UserRoute.js";
import BodyParser  from "body-parser";
import session from "express-session";
import cors from "cors";
import reqFlash from "express-flash";
dotenv.config();

const app = Express();

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.use(Express.static('public'));
app.use(cors());
app.use(BodyParser.urlencoded({extended:false}));
app.use(BodyParser.json());
app.use(reqFlash());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'Tulungagung',
    name: 'secretName',
    cookie:{
        sameSite: true,
        maxAge: 60000,
    },
}));
app.use(router);

app.listen(3000,()=>{
    console.log(`SERVER IS RUNNING 3000`)
});