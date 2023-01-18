const usuarioLogado =  buscarDadosLocalStorage('usuarioLogado')
document.addEventListener('DOMContentLoaded',  () => {

    if(!usuarioLogado.nome){
        alert('nao existe')
        window.location.href = 'index.html'
        return
    } else{
        console.log(usuarioLogado)
        mostrarRecados()
    }
}) 

const listaRecados = usuarioLogado.recados

const formulario = document.getElementById('formularioRecados')

const tbody = document.getElementById('recados')

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

    if(listaRecados.length == 14){
        aviso.innerHTML = 'Você atingiu o número máximo de recados, exclua algum para continuar adicionando!'
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
        <td>
            <button onclick="apagar(${index})">Apagar</button>
            <button onclick="editar(${index})">Editar</button>
        </td>
    </tr>`
    })
}

function editar (indice){
    const sectionAtualizar = document.getElementById('section-atualizar')

    sectionAtualizar.innerHTML += 
    `<div id="div-atualizar">
        <form id="formulario-atualizar">
            <input type="text" name="atualizar-descricao" id="atualizar-descricao" placeholder="Atualizar Descrição" required>
            <input type="text" name="atualizar-detalhamento" id="atualizar-detalhamento" placeholder="Atualizar Detalhamento" required>
            <button type="submit" name="submit" id="submit-atualizar">Atualizar</button>
        </form>
    </div>`

    const formulario = document.getElementById('formulario-atualizar')
    
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault()

        const descricaoAtualizada = document.getElementById('atualizar-descricao').value
        const detalhamentoatualizadi = document.getElementById('atualizar-detalhamento').value
    
        listaRecados[indice].descricao = descricaoAtualizada
        listaRecados[indice].detalhamento = detalhamentoatualizadi

        salvarRecados()

        mostrarRecados()

        sectionAtualizar.innerHTML =''
        
    })
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
//colocar botão de sair do logado
//removeItem