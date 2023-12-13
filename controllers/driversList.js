module.exports = (req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/login.html'));
    
    res.render('driversList',{ users: [], message: '',errors :[], req: req });
}