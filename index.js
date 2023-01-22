const listaUsuario = buscarDadosLocalStorage('cadastros')


const feedbackHTML = window.document.getElementById('feedback')
const usuarioLogado =  buscarDadosLocalStorage('usuarioLogado')
document.addEventListener('DOMContentLoaded',  () => {

    if(usuarioLogado.nome){
        window.location.href = 'listaRecados.html'
        return
    } 
}) 

const formularioEntrarHTML = window.document.getElementById('formulario-entrar')

formularioEntrarHTML.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const inputnome = window.document.getElementById('nome-usuario')
    

    inputnome.addEventListener('focus', () => {
        feedbackHTML.innerHTML = ''
    })

    const inputsenha = window.document.getElementById('senha-usuario')
    

    inputsenha.addEventListener('focus', () => {
        feedbackHTML.innerHTML = ''
    })

    const usuarioLogado = listaUsuario.find((valor) => valor.nome === inputnome.value && valor.senha === inputsenha.value)
  
    if(!usuarioLogado){
        feedbackHTML.innerHTML = 'Nome de usúario ou senha incorretos!'
        return
    }

    guardarLocalStorage('usuarioLogado', usuarioLogado)

    formularioEntrarHTML.reset()

    setTimeout( () => { window.location.href = 'listaRecados.html' } , 1000)
   
})

function guardarLocalStorage(chave, valor){
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)
}


function buscarDadosLocalStorage(chave){

    const dadoJSON = localStorage.getItem(chave)

    if(dadoJSON){
    const dadosConvertidos = JSON.parse(dadoJSON)
        return dadosConvertidos
    }
    else{
        return[]
    }
}