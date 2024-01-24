const express = require('express');
const { listarTarefas, criarTarefa, atualizarTarefa, deletarTarefa } = require('./controladores/controladoresTarefas');

const rotas = express();

rotas.post('/tarefa', criarTarefa);
rotas.get('/tarefas', listarTarefas);
rotas.put('/tarefa/:id', atualizarTarefa);
rotas.delete('/tarefa/:id', deletarTarefa)

module.exports = rotas;