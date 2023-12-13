module.exports = (req,res)=>{
    
    res.render('login',{ users: [], message: '',errors :[] , req: req});
}