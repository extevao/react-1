import PubSub from 'pubsub-js'

export default class TratadorErros {
    publicaErros(erros) {
        console.log(erros)

        erros.errors.forEach(erro => {
            console.log({ erro })
            PubSub.publish('erro-validacao', erro)
        })
    }
}
