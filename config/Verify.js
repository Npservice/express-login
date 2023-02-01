 const isLogin = (function(req,res,next){
    if(req.session.loggedin === true){
        next();
        return;
    }else{
        req.session.destroy((err)=>{
            res.redirect('/')
        });
    }
});
 const isLogout = (function(req,res,next){
    if(req.session.loggedin !==true){
        next();
        return;
    }
    res.redirect('/');
});
 export default {isLogin, isLogout}