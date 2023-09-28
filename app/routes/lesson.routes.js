module.exports = app => {
  const lessons = require("../controllers/lesson.controller.js");

  var router = require("express").Router();
  const { query, body, validationResult } = require('express-validator');

  router.use(function (req, res, next) {
    // if (req.headers.type === 'admin') {
    //   next();
    // } else {
    //   res.status(500).send({ messagem: 'Usuário não autorizado' });
    // }
    next();
  });

  // Create a new Lesson
  router.post("/",

    // Validando com express-validator

    body('title')
      .notEmpty().isString().isLength({ min: 3 }).withMessage('O título da aula deve ter pelo menos 3 caracteres'),

    body('description')
      .notEmpty().isString().isLength({ min: 3 }).withMessage('A descripção da aula deve ter pelo menos 3 caracteres'),

    body('teacher')
      .notEmpty().isString().isLength({ min: 3 }).withMessage('O nome do Professor deve ter pelo menos 3 caracteres'),

    body('typelesson')
      .notEmpty().isString().isLength({ min: 3 }).withMessage('O tipo da aula deve ter pelo menos 3 caracteres'),

    body('linkteste')
      .optional().isString().isURL().matches(/docs\.google\.com/).withMessage('O URL da avaliação deve ser uma url válida, deve ser de um formulário do Google Form'),

    body('published')
      .notEmpty().isBoolean().withMessage('O campo de publicado não deve ser vazio, deve ser True ou False'),


    (req, res) => {
      const result = validationResult(req);
      result.errors.length ? returnError(result.errors, res) : lessons.create(req, res);
    });

  // Retrieve all Lessons
  router.get("/lista-inteira", lessons.findAll);
  // Retrieve all published Lessons
  router.get("/published", lessons.findAllPublished);

  // Retrieve a single Lesson with id
  router.get("/id", query('id').notEmpty().withMessage('ID é obrigatório'),
    (req, res) => {
      const result = validationResult(req);
      result.errors.length ? returnError(result.errors, res) : lessons.findOne(req, res);
    });



};
