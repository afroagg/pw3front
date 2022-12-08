const { response } = require('express');
const express = require('express');

const app = express();
const axios = require('axios').default;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');


//ROTA DE CADASTRO DE CATEGORIAS
app.get('/cadastroIngrediente', (req, res)=>{
    res.render('ingrediente/index');
});

// RENDERIZAÇÃO DE FORMULARIO DE CADASTRO
app.post('/cadastroIngrediente', (req, res)=>{

    const urlcadastrarIngrediente = 'http://localhost:3000/inserirIngrediente';
    console.log(req.body);

    axios.post(urlcadastrarIngrediente, req.body)
    .then(
        (response)=> {
            const urlListagemIngrediente = 'http://localhost:3000/listarIngrediente';
            axios.get(urlListagemIngrediente)
            .then(
                (response) =>{
                    let ingrediente = response.data;
                    res.render('ingrediente/listagemIngrediente', {ingrediente});
                }
            )
        }
    )

});

//ROTA DE LISTAGEM DE CATEGORIAS
app.get('/listagemIngrediente', (req, res)=>{
    
    const urlListagemIngrediente = 'http://localhost:3000/listarIngrediente';

    /*
    CHAMADA PELO AXIOS:
    1 - URL DA ROTA (urlListagemCategoria)
    2 - CALLBACK DA RESPOSTA DA CHAMADA
    */
    axios.get(urlListagemIngrediente)
        .then(
            (response)=>{
                // console.log(response.data);
                // res.send(response.data);
                let ingrediente = response.data;
                res.render('ingrediente/listagemIngrediente', {ingrediente});

        }); 
    });

    //ROTA DE LISTAGEM DE EDIÇÃO
    app.get('/formEdicaoIngrediente/:id', (req, res)=>{
        
        //RECEBE O ID DE CATEGORIA QUE VAI SER EDITADO
        let {id} = req.params;
        // console.log(id);

        //CHAMADA DO AXIOS PARA A API:
        const urlListagemIngrediente = `http://localhost:3000/listarIngrediente/${id}`;
        
        axios.get(urlListagemIngrediente)
        .then(
            (response)=>{

                let ingrediente = response.data;
                res.render('ingrediente/editarIngrediente', {ingrediente});

            }
        )
    });

    //ROTA DE EDIÇÃO
    app.post('/alterarIngrediente', (req, res)=>{

        const urlAlterarIngrediente = 'http://localhost:3000/alterarIngrediente';
        console.log(req.body);

        axios.put(urlAlterarIngrediente, req.body)
        .then(
            (response)=> {
                const urlListagemIngrediente = 'http://localhost:3000/listarIngrediente';
                axios.get(urlListagemIngrediente)
                .then(
                    (response) =>{
                        let ingrediente = response.data;
                        res.render('ingrediente/listagemIngrediente', {ingrediente});
                    }
                )
            }
        )

    });

app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});



app.get('/excluirIngrediente/:id',(req, res)=>{

    let {id} = req.params;

    const urlDeletarIngrediente = `http://localhost:3000/excluirIngrediente/${id}`;
   

    axios.delete(urlDeletarIngrediente, req.params)
    .then(
        (response)=> {
            const urlListagemIngrediente = 'http://localhost:3000/listarIngrediente';
            axios.get(urlListagemIngrediente)
            .then(
                (response) =>{
                    let ingrediente = response.data;
                    res.render('ingrediente/listagemIngrediente', {ingrediente});
                }
            )
        }
    )
});


