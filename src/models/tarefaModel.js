const mongoose = require('mongoose');
const validator = require('validator');

const TarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  resumo: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now },
  paraDia: { type: Date, required: true },
});

const TarefaModel = mongoose.model('Tarefa', TarefaSchema);

function Tarefa(body) {
  this.body = body;
  this.errors = [];
  this.tarefa = null;
}

Tarefa.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.tarefa = await TarefaModel.create(this.body);
};

Tarefa.prototype.valida = function() {
  this.cleanUp();

  if(!validator.isLength(this.body.titulo, { min: 3, max: 30 })) {
    this.errors.push('O titulo deve ter entre 3 e 30 caracteres.');
  }
  if(!dataValidator(this.body.paraDia)) {
    this.errors.push('Data inválida.');
  }

};

dataValidator = function(data) {
  return validator.isISO8601(data);
}


Tarefa.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    titulo: this.body.titulo,
    resumo: this.body.resumo,
    paraDia: this.body.paraDia,
  };

};

Tarefa.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.tarefa = await TarefaModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Métodos estáticos
Tarefa.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const tarefa = await TarefaModel.findById(id);
  return tarefa;
};

Tarefa.buscaTarefas = async function() {
  const tarefas = await TarefaModel.find()
    .sort({ criadoEm: -1 });
  return tarefas;
};

Tarefa.delete = async function(id) {
  if(typeof id !== 'string') return;
  const tarefa = await TarefaModel.findOneAndDelete({_id: id});
  return tarefa;
};


module.exports = Tarefa;
