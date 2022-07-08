const Tarefa = require('../models/TarefaModel');

exports.index = async(req, res) => {
  const tarefas = await Tarefa.buscaTarefas();
  res.render('index', { tarefas });
};

