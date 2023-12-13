const getUser = require('../models/CreateUser');

module.exports = (req,res)=>{

    const testType = req.query.testtype;
    if (testType == "G2") {
      getUser.find(
        {$or: [
          {'exam_details.testtype': testType,UserType:"Driver"},
          {'exam_details.testtype': ""}
        ]})
      .then(users_data => {
          res.json(users_data);
         
        })
        .catch(err=>{
  
          res
          .status(500)
          .send({message: err.message || "Can not find the appointments   !"})
      }); 
    } else {
        getUser.find({'exam_details.testtype': testType,UserType:"Driver"})
        .then(users_data => {
            res.json(users_data);
          
          })
          .catch(err=>{
    
            res
            .status(500)
            .send({message: err.message || "Can not find the appointments   !"})
        }); 
    }


}