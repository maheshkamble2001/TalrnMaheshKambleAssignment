const developer = require("../models/developer");

// CREATE
exports.addDeveloper = async (req, res) => {
  try {
    const {name,role,experience,techStack}= req.body
    console.log(name)
    console.log(role)
    console.log(experience)
    console.log(techStack)
    // const result = await developer.create(req.body);
    // res.json(result);
    res.json({code:200,message:"sucess",data:{name,role,experience,techStack}});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
exports.getAllDevelopers = async (req, res) => {
  try {
    console.log(req.query)
    const result = await developer.findAll();
    res.json({code:404,message:"sucess",data:JSON.parse(req.query.reqData)});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
