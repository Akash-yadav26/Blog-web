const{ValidateToken}= require("../services/auth");
function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            next();
            return;
        }
        try{
            const userPayload = ValidateToken(tokenCookieValue);
            req.user = userPayload;
        }
        catch(error){}
        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
}