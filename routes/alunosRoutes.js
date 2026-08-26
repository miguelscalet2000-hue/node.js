const express = require("express");
const router = express.Router();

let alunos = [
    {
        id : 1,
        nome: "Scalet",
        descricao: "Miguel"
    },
    {
        id : 2,
        nome: "rasd_Verde",
        descricao: "Sendo um rasd"
    }
];


//rota
router.get("/", (req, res) => {
    res.status(200).json(alunos)
})


//rota por ID
router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    let aluno = alunos.find(cat => cat.id === id);

    if(!aluno){
        return res.status(404).json({
            mensagem: 'Aluno não encontrado'
        });
    }

    res.status(200).json(aluno);
})


//Salvar
router.post("/", (req, res) => {
    let{nome, descricao} = req.body;

    if(!nome){
        return res.status(400).json({
            mensagem : "O nome é obrigatório"
        });
    }

    let novoRegistro = {
        id: alunos.length + 1,
        nome,
        descricao
    };

    alunos.push(novoRegistro);
    res.status(201).json(novoRegistro);
});


//Editar
router.put("/:id", (req, res) => {
    let id = Number(req.params.id);
    let aluno = alunos.find(cat => cat.id === id);
    let{nome, descricao} = req.body;

    if(!aluno){
        return res.status(400).json({
            mensagem : "Aluno não encontrado"
        });
    }

    aluno.nome = nome;
    aluno.descricao = descricao;

    res.status(200).json({
        mensagem:"Aluno atualizado",
        aluno
    });
});

//excluir registro
    router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let indice = alunos.findIndex((c) => c.id === id);

    if(indice === -1){
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    alunos.splice(indice, 1);
    res.status(200).json({
        mensagem: "Aluno removido com sucesso"
    });
});

module.exports = router;