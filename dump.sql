create table tarefas (
    id serial primary key,
    titulo text not null,
    descricao text,
    data date not null,
    status text not null
);
