let listaUsuario = buscarDadosLocalStorage('cadastros')

const formularioCadastrarHTML = window.document.getElementById('formulario-cadastro')

const feedbackHTML = window.document.getElementById('feedback')

formularioCadastrarHTML.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const inputnome = window.document.getElementById('nome-novo-usuario')
    console.log(inputnome.value)

    inputnome.addEventListener('focus', () => {
        feedbackHTML.innerHTML = ''
    })

    const inputsenha = window.document.getElementById('senha-novo-usuario')
    console.log(inputsenha.value)

    inputsenha.addEventListener('focus', () => {
        feedbackHTML.innerHTML = ''
    })

    const inputsenhaconfirmar = window.document.getElementById('conferir-senha-novo-usuario')
    console.log(inputsenhaconfirmar.value)

    inputsenhaconfirmar.addEventListener('focus', () => {
        feedbackHTML.innerHTML = ''
    })


    const existe = listaUsuario.some((valor) => valor.nome === inputnome.value)
    
    if(existe){
        feedbackHTML.innerHTML = 'Nome de usuário já existente! Tente novamente.'
        formularioCadastrarHTML.reset()

        return
    }

    if(inputsenha.value !== inputsenhaconfirmar.value){
        feedbackHTML.innerHTML = 'As senhas não conferem! Tente novamente.'

        return
    }


    const novoUsuario = {
        nome: inputnome.value,
        senha: inputsenha.value,
        recados: []
    }
    console.log(novoUsuario)

    listaUsuario.push(novoUsuario)
    console.log(listaUsuario)

    guardarLocalStorage('cadastros', listaUsuario)



    formularioCadastrarHTML.reset()

   //adicionar uma div com um id no meio da tela, 
    //contacriada com sucesso estamos redirecionando par a apagina 
    setTimeout( () => { window.location.href = './index.html' } , 5000)

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
        return []
    }
}