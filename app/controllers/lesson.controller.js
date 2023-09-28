const db = require("../models");
const Lesson = db.lessons;
const Op = db.Sequelize.Op;

// Create and Save a new Lesson
exports.create = (req, res) => {
    // Create a Lesson
    const lesson = {
        title: req.body.title,
        description: req.body.description,
        teacher: req.body.teacher,
        typelesson: req.body.typelesson,
        linkteste: req.body.linkteste,
        published: req.body.published ? req.body.published : false
    };

    // Save Lesson in the database
    Lesson.create(lesson)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.error(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Lesson."
            });
        });
};
