const usuarioLogado =  buscarDadosLocalStorage('usuarioLogado')
document.addEventListener('DOMContentLoaded',  () => {

    if(!usuarioLogado.nome){
        alert('nao existe')
        window.location.href = 'index.html'
        return
    } else{
        mostrarRecados()
    }
}) 

const listaRecados = usuarioLogado.recados

const formulario = document.getElementById('formularioRecados')

const tbody = document.getElementById('recados')

const sectionAtualizar = document.getElementById('section-atualizar')

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const descricao = document.getElementById('descricao')
    descricao.addEventListener('focus', () => {
        aviso.innerHTML = ''
    })

    const detalhamento = document.getElementById('detalhamento')
    detalhamento.addEventListener('focus', () => {
        aviso.innerHTML = ''
    })

    const aviso = document.getElementById('aviso')

    if(listaRecados.length == 15){
        aviso.innerHTML = 'Você atingiu o número máximo de recados, exclua algum para continuar adicionando!'
        setTimeout( () => { aviso.innerHTML = '' } , 2500)
   
        return
    }

    const novoRecado = {
        descricao: descricao.value,
        detalhamento: detalhamento.value
    }

    listaRecados.push(novoRecado)
    salvarRecados()
    
    formulario.reset()

    mostrarRecados()
})

///funcao exluir e atualizar recado

function mostrarRecados(){
    tbody.innerHTML = ''

    listaRecados.forEach((valor, index) => {
        tbody.innerHTML += `
        <tr id='${index}'>
        <td>${index + 1}</td>
        <td>${valor.descricao}</td>
        <td>${valor.detalhamento}</td>
        <td id="td">
            <button id="apagar" onclick="apagar(${index})"><i class="bi bi-trash3-fill"></i></button>
            <button id="editar" onclick="editar(${index})"><i class="bi bi-patch-plus-fill"></i></button>
        </td>
    </tr>`
    })
}
function fechar(){
    sectionAtualizar.innerHTML =''
}

function editar (indice){
    

    sectionAtualizar.innerHTML += 
    `<div id="div-atualizar">
        <form id="formulario-atualizar">
        <h1 id="titulo-editar">Edite seu recado!</h1>
            <input type="text" name="atualizar-descricao" id="atualizar-descricao" placeholder="Atualizar Descrição" required>
            <input type="text" name="atualizar-detalhamento" id="atualizar-detalhamento" placeholder="Atualizar Detalhamento" required>
            <button type="submit" id="submit-atualizar">Atualizar</button>
            <span id="feedback"></span>
        </form>
        <button onclick="fechar()" id="fechar">Fechar</button>
    </div>`

    const formulario = document.getElementById('formulario-atualizar')
    
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault()

        const descricaoAtualizada = document.getElementById('atualizar-descricao')

        descricaoAtualizada.addEventListener('focus', () => {
            feedback.innerHTML = ''
        })
    
        const detalhamentoatualizadi = document.getElementById('atualizar-detalhamento')

        const feedback = document.getElementById('feedback')

        listaRecados[indice].descricao = descricaoAtualizada.value
        listaRecados[indice].detalhamento = detalhamentoatualizadi.value

        salvarRecados()

        mostrarRecados()

        sectionAtualizar.innerHTML =''
    })
}

function apagar(indice){
    usuarioLogado.recados.splice(indice, 1)

    const remover = document.getElementById(indice)
    remover.remove()

    salvarRecados()
    mostrarRecados()
}

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
        return {}
    }
}

function sair(){
    salvarRecados()

   localStorage.removeItem('usuarioLogado')

   window.location.href = './index.html' 

}

function salvarRecados(){
    const listaUsuario = buscarDadosLocalStorage('cadastros')
    
    const acharUsuario = listaUsuario.findIndex((valor) => valor.nome === usuarioLogado.nome)
 
    listaUsuario[acharUsuario].recados = listaRecados
    usuarioLogado.recados = listaRecados

    guardarLocalStorage('usuarioLogado', usuarioLogado)
    guardarLocalStorage('cadastros', listaUsuario)
}
