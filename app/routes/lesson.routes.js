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
};
