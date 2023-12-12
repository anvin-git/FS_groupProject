module.exports = (req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/login.html'));
    console.log("")
    res.render('login',{ users: [], message: '',errors :[] , req: req});
}