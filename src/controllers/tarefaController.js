const Tarefa = require('../models/TarefaModel');

exports.index = (req, res) => {
  res.render('tarefa', {
    tarefa: {}
  });
};

exports.register = async(req, res) => {
  try {
    const tarefa = new Tarefa(req.body);
    await tarefa.register();

    if(tarefa.errors.length > 0) {
      req.flash('errors', tarefa.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Tarefa registrado com sucesso.');
    req.session.save(() => res.redirect(`/tarefa/index/${tarefa.tarefa._id}`));
    return;
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const tarefa = await Tarefa.buscaPorId(req.params.id);
  if(!tarefa) return res.render('404');

  res.render('tarefa', { tarefa });
};

exports.edit = async function(req, res) {
  try {
    if(!req.params.id) return res.render('404');
    const tarefa = new Tarefa(req.body);
    await tarefa.edit(req.params.id);

    if(tarefa.errors.length > 0) {
      req.flash('errors', tarefa.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Tarefa editado com sucesso.');
    req.session.save(() => res.redirect(`/tarefa/index/${tarefa.tarefa._id}`));
    return;
  } catch(e) {
    console.log(e);
    res.render('404');
  }
};

exports.delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const tarefa = await Tarefa.delete(req.params.id);
  if(!tarefa) return res.render('404');

  req.flash('success', 'Tarefa apagado com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};
