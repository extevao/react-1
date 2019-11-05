//FormularioAutor
// TabelaAutores

import React, { Component } from 'react'
import InputCustomizado from './componentes/InputCustomizado'
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado'


export default class AutorBox extends Component {

    constructor() {
        super();

        this.state = {
            lista: [],
        };

        this.atualizaListagem = this.atualizaListagem.bind(this)

    }

    componentDidMount() {
        console.log('componentDidlMount')
        return
        fetch('http://cdc-react.herokuapp.com/api/autores')
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
            .then(autores =>{
                console.log('autores', autores)
                this.setState({ lista: autores })
            })
            .catch(console.error)
    }
    atualizaListagem(novaLista) {
        this.setState({ lista: novaLista })
    }

    render() {
        return (
            <div>
                <FormularioAutor callbackAtualizaListagem={this.atualizaListagem} />
                <TabelaAutores lista={this.state.lista}/>
            </div>
        );
    }
}


class FormularioAutor extends Component {

    constructor() {
        super();

        this.state = {
            nome: '',
            email: '',
            senha: ''
        };

        this.enviaForm = this.enviaForm.bind(this);

        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();

        const options = {
            method: "POST",
            body: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch('http://cdc-react.herokuapp.com/api/autores', options)
            .then(res => res.json())
            .then(lista => {
                this.props.callbackAtualizaListagem(lista)
            })
            .catch(console.error);

    }

    setNome(evento) {
        this.setState({ nome: evento.target.value });
    }

    setEmail(evento){
        this.setState({ email: evento.target.value });
    }

    setSenha(evento) {
        this.setState({ senha: evento.target.value });
    }


    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />
                    <InputCustomizado label="Email" id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} />
                    <InputCustomizado label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} />

                    <BotaoSubmitCustomizado label="Gravar" />
                </form>
            </div>

        )
    }
}

class TabelaAutores extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>email</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(autor =>
                                (<tr key={autor.id}>
                                    <td>{autor.nome}</td>
                                    <td>{autor.email}</td>
                                </tr>)
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
