const knex = require('../conexao');

const criarTarefa = async (req, res) => {
    
    const { titulo, descricao, data, status } = req.body;
    
    try {
       
       const [novaTarefaId] = await knex('tarefas').insert({
            titulo,
            descricao,
            data,
            status
        }).returning('*');

        const novaTarefa = await knex('tarefas')
        .where('id', novaTarefaId)
        .first();

        return res.json(novaTarefa);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao cadastrar tarefa.'});
    }
};

const listarTarefas = async (req, res) => {
    try {
        const tarefas = await knex('tarefas').select('*').orderBy('id');

        return res.status(200).json(tarefas);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao listar tarefas.' });
    }
};

const atualizarTarefa = async (req,res) => {
    
    const { id } = req.params;
    const { titulo, descricao, data, status } = req.body;
    
    try {
     
        const tarefaEncontrada = await knex('tarefas').where({id}).first();
        
        if(!tarefaEncontrada) {
            return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
        }

        await knex('tarefas')
        .where({ id })
        .update({
            titulo,
            descricao,
            data,
            status
        });

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao atualizar tarefa.'});
    }
};

const deletarTarefa = async (req, res) => {
    
    const { id } = req.params;
    
    try {

        const tarefaEncontrada = await knex('tarefas').where({id}).first();
        
        if(!tarefaEncontrada) {
            return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
        }

        await knex('tarefas').where({ id }).delete()

        return res.status(204).json({ mensagem: 'Tarefa deletada com sucesso.' });
        
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao deletar tarefa.'});  
    }
};



module.exports = {
    listarTarefas,
    criarTarefa,
    atualizarTarefa,
    deletarTarefa
}