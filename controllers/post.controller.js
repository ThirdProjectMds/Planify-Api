const mydata = require("../data.json") 

module.exports.getPosts = (req, res, next) => {
 res.send(mydata)
};
