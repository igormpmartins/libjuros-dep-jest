/*
Lib para cálculos de juros, com testes unitários e injeção de dependências.

Exercício proposto no Fullstack Master da DevPleno, porém com algumas modificações (como a formatação em 2 casas), 
além de incluir outros testes e a coleta da cobertura de teste.

*/

const roundFloat = value => parseFloat(value.toFixed(2))

const jurosSimples = (c, i, t) => roundFloat(c * i * t)
const montanteJurosSimples = ({jurosSimples}) => (c, i, t) => roundFloat(c + jurosSimples(c, i, t))

const montanteJurosCompostos = (c, i, t) => {
    const meuVal = roundFloat(c * Math.pow((1.0 +  i), t))
    return meuVal
}

const jurosCompostos = ({montanteJurosCompostos}) => (c, i, t) => {
    return roundFloat(montanteJurosCompostos(c, i, t) - c)
    
}


module.exports = {
    jurosSimples, 
    jurosCompostos: jurosCompostos({montanteJurosCompostos}), 
    montanteJurosSimples: montanteJurosSimples({jurosSimples}), 
    montanteJurosCompostos, 
    roundFloat,
    pure: {
        montanteJurosSimples, 
        jurosCompostos
    }

}
