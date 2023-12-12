module.exports = (req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/login.html'));
    
    res.render('login',{ users: [], message: '',errors :[] });
}