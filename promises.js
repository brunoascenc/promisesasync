// Vai pegar uma promessa e resolver, se der errado cai no catch.
// const falarDepoisDe = (segundos, frase) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(frase)
//         }, segundos * 1000)
//     })
// }

// falarDepoisDe(3, 'Show')
//     .then(frase => frase.concat('???'))
//     .then(outraFrase => console.log(outraFrase))
//     .catch(e => console.log(e))

const http = require('http')

const getTurma = letra => {
    const url = `http://files.cod3r.com.br/curso-js/turma${letra}.json`
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let resultado = ''

            res.on('data', dados => {
                resultado += dados
            })

            res.on('end', () => {
                try {
                    resolve(JSON.parse(resultado))
                } catch (e) {
                    reject(e)
                }
            })
        })
    })
}

// Cadeia de promises, quando for resolvida ou rejeitada vai começar a chamar os 'then'.
Promise.all([getTurma('A'), getTurma('B'), getTurma('C')])
    .then(turmas => [].concat(...turmas))
    .then(alunos => alunos.map(aluno => aluno.nome))
    .then(nomes => console.log(nomes))
    .catch(e => console.log(e))