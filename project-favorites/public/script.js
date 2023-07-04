const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')



// // Não se preocupem com esse pedaço de código comentado! Vamos descomentá-lo quando tivermos acabado de construir a API.

// // Função que carrega o conteúdo da API.
// async function load() {
//     // fetch está como await para evitar que entre num esquema de promisse e só devolva o conteúdo após a iteração qua acontece em seguida.
//     const res = await fetch('http://localhost:3000/')
//         .then(data => data.json())
//     // Iterando no vetor com o conteúdo (JSON) que está vindo da API e adicionando-os no frontend.
//     res.urls.map(({name, url}) => addElement({name, url}))
// }

// load()


function addElement({ name, url }) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${url}"> ${name}</a><input type="button"  id="remover" onclick="removeElement(this)" class="botao" value="Remover">`
    ul.appendChild(li)
    
   
}

function removeElement(element) {
    var liRemover = element.parentNode; // Obtém o elemento pai (li) do botão clicado
    var ul = liRemover.parentNode; // Obtém o elemento pai (ul) do elemento li
    
    if(confirm('Deseja remover esse link?'))ul.removeChild(liRemover);
}

form.addEventListener('submit', (event) => {
    // Impede o comportamento padrão do evento de envio do formulário
    event.preventDefault();

    let { value } = input;

    // Verifica se o campo está vazio
    if (!value)
        return alert('Preencha o campo!');

    const [name, url] = value.split(',');

    // Verifica se o texto está formatado corretamente
    if (!url)
        return alert('O texto não está formatado da maneira correta.');

    // Verifica se a URL começa com 'http'
    if (!/^http/.test(url))
        return alert('Digite a URL da maneira correta.');

    // Chama a função addElement passando o nome e a URL extraídos do valor do campo
    addElement({ name, url });

    // Limpa o valor do campo de entrada
    input.value = '';
});
