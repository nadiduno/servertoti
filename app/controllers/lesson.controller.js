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

// Retrieve all Lessons from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Lesson.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving lesson."
            });
        });
};

// Find a single Lesson with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Lesson.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Lesson with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Lesson with id=" + id
            });
        });
};

// Update a Lesson by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Lesson.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Lesson was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Lesson with id=${id}. Maybe Lesson was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Lesson with id=" + id
            });
        });
};

// Delete a Lesson with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Lesson.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Lesson was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Lesson with id=" + id
            });
        });
};
