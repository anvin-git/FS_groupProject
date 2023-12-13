module.exports = (req,res)=>{
    
    res.render('examiner_list',{ users: [], message: '',errors :[] , req: req});
}