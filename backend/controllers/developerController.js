const { Op } = require("sequelize");
const developer = require("../models/developer");

// CREATE
exports.addDeveloper = async (req, res) => {
  try {
    const { name, role, experience, techStack } = req.body;

    if (!name) {
      return res.json({ code: 401, message: "Name is required", data: {} });
    }
    if (!role) {
      return res.json({ code: 401, message: "Role is required", data: {} });
    }
    if (!experience) {
      return res.json({
        code: 401,
        message: "Experience is required",
        data: {},
      });
    }

    // Correct techStack validation
    if (!techStack || techStack.length === 0) {
      return res.json({
        code: 401,
        message: "Tech Stack is required",
        data: {},
      });
    }

    // Convert array → string
    const techStackString = techStack.join(", ");

    // Save to DB
    const result = await developer.create({
      name,
      role,
      experience,
      techStack: techStackString, // store as string
    });

    return res.json({
      code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// READ ALL
exports.getAllDevelopers = async (req, res) => {
  try {
    const request = JSON.parse(req.query.reqData);

    let whereCondition = {};

    if (request.search) {
      whereCondition = {
        ...whereCondition,
        [Op.or]: [{ name: { [Op.like]: `%${request.search}%` } }],
      };
    }

    if (request.techStack) {
      whereCondition = {
        ...whereCondition,
        techStack: { [Op.like]: `%${request.techStack}%` },
      };
    }

    if (request.role) {
      whereCondition = {
        ...whereCondition,
        role: { [Op.like]: `%${request.role}%` },
      };
    }

    const result = await developer.findAll({
      where: whereCondition,
    });

    res.json({
      code: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
