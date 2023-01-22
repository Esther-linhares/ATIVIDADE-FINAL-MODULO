let listaUsuario = buscarDadosLocalStorage('cadastros')

const formularioCadastrarHTML = window.document.getElementById('formulario-cadastro')

const feedbackHTML = window.document.getElementById('feedback')

formularioCadastrarHTML.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const inputnome = window.document.getElementById('nome-novo-usuario')
    

    inputnome.addEventListener('focus', () => {
        feedbackHTML.innerHTML = ''
    })

    const inputsenha = window.document.getElementById('senha-novo-usuario')
 

    inputsenha.addEventListener('focus', () => {
        feedbackHTML.innerHTML = ''
    })

    const inputsenhaconfirmar = window.document.getElementById('conferir-senha-novo-usuario')
  

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

    listaUsuario.push(novoUsuario)
   
    guardarLocalStorage('cadastros', listaUsuario)
  
    const section = document.getElementById('section-login')

    section.innerHTML=
    `<div id="div">
        <div id="div2">
            <h3 id="p">Conta criada com sucesso!</h3>
        </div>
    </div>`
    setTimeout( () => {section.innerHTML = '' } , 3000)
    setTimeout( () => { window.location.href = 'index.html' } , 3000)
   
    formularioCadastrarHTML.reset()
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