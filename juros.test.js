const { expect } = require('@jest/globals')
const juros = require('./juros')

test('Util roundFloat', ()=>{
    const ret = juros.roundFloat(50.56789)
    expect(ret).toEqual(50.57)
})

describe('Juros simples', () => {

    test('Juros ', () => {
        let ret = juros.jurosSimples(1000, 0.035, 12)
        expect(ret).toEqual(420)
        
        ret = juros.jurosSimples(1500.5, 0.03, 15)
        expect(ret).toEqual(675.23)
    })

    test('Juros Montante', () => {
        const jurosSimples = jest.fn()
        jurosSimples.mockImplementation(() => 500)

        let C = 1000
        let i = 0.035
        let t = 12

        let ret = juros.pure.montanteJurosSimples({jurosSimples})(C, i, t)
        expect(jurosSimples.mock.calls[0]).toEqual([C, i, t])
        expect(ret).toEqual(1500)

        C = 1500.5
        i = 0.03
        t = 15
        ret = juros.pure.montanteJurosSimples({jurosSimples})(C, i, t)
        expect(jurosSimples.mock.calls[1]).toEqual([C, i, t])
        expect(ret).toEqual(2000.5)

    })

})

describe('Juros Compostos', () => {

    test('Juros ', () => {

        const montanteJurosCompostos = jest.fn()
        montanteJurosCompostos.mockImplementation(() => 1795.86)

        let C = 1000
        let i = 0.05
        let t = 12

        let ret = juros.pure.jurosCompostos({montanteJurosCompostos})(C, i, t)
        expect(montanteJurosCompostos.mock.calls[0]).toEqual([C, i, t])
        expect(ret).toEqual(795.86)
        

        C = 1500.5
        i = 0.038
        t = 15
        montanteJurosCompostos.mockReturnValue(2625.4)
        ret =  juros.pure.jurosCompostos({montanteJurosCompostos})(C, i, t)
        expect(montanteJurosCompostos.mock.calls[1]).toEqual([C, i, t])
        expect(ret).toEqual(1124.9)
        

    })

    test('Juros Montante', () => {

        let ret = juros.montanteJurosCompostos(1000, 0.1, 1)
        expect(ret).toEqual(1100)

        ret = juros.montanteJurosCompostos(1500.5, 0.038, 15)
        expect(ret).toEqual(2625.4)
    })

})