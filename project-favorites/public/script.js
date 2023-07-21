// // Seleciona o elemento <ul> no documento HTML e o armazena na variável 'ul'
// const ul = document.querySelector('ul');

// // Função para carregar as URLs do servidor
// async function loadUrls() {
//   try {
//     // Faz uma requisição GET para obter as URLs do backend
//     const response = await fetch('http://localhost:3000/urls');
//     const data = await response.json();
//     const urls = data.map(obj => ({
//       name: obj.name,
//       url: obj.url
//     }));

//     // Limpa a lista antes de adicionar as URLs
//     ul.innerHTML = '';

//     // Adiciona as URLs na lista
//     urls.forEach(url => {
//       const li = document.createElement('li');
//       const a = document.createElement('a');
//       a.href = url.url;
//       a.textContent = url.name;
//       li.appendChild(a);
//       ul.appendChild(li);
//     });
//   } catch (error) {
//     console.error('Erro ao carregar as URLs:', error);
//   }
// }

// // Chama a função para carregar as URLs ao carregar a página
// window.addEventListener('load', loadUrls);

// // Função para adicionar uma URL
// async function addUrl() {
//   try {
//     const name = document.getElementById('nameInput').value;
//     const url = document.getElementById('urlInput').value;

//     // Faz uma requisição POST para adicionar a URL no backend
//     await fetch('http://localhost:3000/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ name, url })
//     });

//     // Atualiza a lista de URLs
//     loadUrls();
//   } catch (error) {
//     console.error('Erro ao adicionar a URL:', error);
//   }
// }

// // Função para remover uma URL
// async function removeUrl(event) {
//   try {
//     const url = event.target.getAttribute('href');

//     // Faz uma requisição DELETE para remover a URL do backend
//     await fetch(`http://localhost:3000/delete?url=${encodeURIComponent(url)}`, {
//       method: 'DELETE'
//     });

//     // Atualiza a lista de URLs
//     loadUrls();
//   } catch (error) {
//     console.error('Erro ao remover a URL:', error);
//   }
// }
//ACIMA UMA TENTATIVA DE LIGAÇÃO COM O MONGO DB
// Seleciona o elemento <ul> no documento HTML e o armazena na variável 'ul'
const ul = document.querySelector('ul');

// Seleciona o primeiro elemento <input> no documento HTML e o armazena na variável 'input'
const input = document.querySelector('input');

// Seleciona o primeiro elemento <form> no documento HTML e o armazena na variável 'form'
const form = document.querySelector('form');

// Função assíncrona que carrega os elementos iniciais da página
async function load() {
  // Faz uma solicitação assíncrona para 'http://localhost:3000/' e aguarda a resposta
  const res = await fetch('http://localhost:3000/').then(data => data.json());
  
  // Mapeia os objetos 'name' e 'url' da resposta e chama a função 'addElementApi' para cada objeto
  res.urls.map(({ name, url }) => addElementApi({ name, url }));
}

// Chama a função 'load' para carregar os elementos iniciais da página
load();

// Função que adiciona um elemento à lista
function addElement({ name, url }) {
  // Cria um novo elemento <li>
  const li = document.createElement('li');

  // Define o HTML interno do elemento <li> com base nos valores 'name' e 'url'
  li.innerHTML = `
    <a href="${url}">${name}</a>
    <input type="button" id="remover" onclick="removeElement(this)" class="botao" value="Remover">
    <input type="button" id="editar" onclick="editElement(this)" class="botao" value="Editar">
  `;

  // Adiciona o elemento <li> à lista
  ul.appendChild(li);

  try {
    // Faz uma solicitação para 'http://localhost:3000/' com os parâmetros 'name' e 'url' no método POST
    fetch(`http://localhost:3000/?name=${name}&url=${url}`, { method: 'POST' });

    // Retorna o controle para finalizar a função
    return;
  } catch (error) {
    // Em caso de erro, exibe uma mensagem de erro no console
    console.log('Erro na requisição');
  }
}

// Função que adiciona um elemento da API à lista
function addElementApi({ name, url }) {
  // Cria um novo elemento <li>
  const li = document.createElement('li');

  // Define o HTML interno do elemento <li> com base nos valores 'name' e 'url'
  li.innerHTML = `
    <a href="${url}">${name}</a>
    <input type="button" id="remover" onclick="removeElement(this)" class="botao" value="Remover">
    <input type="button" id="editar" onclick="editElement(this)" class="botao" value="Editar">
  `;

  // Adiciona o elemento <li> à lista
  ul.appendChild(li);
}

// Função que remove um elemento da lista
function removeElement(element) {
  // Obtém o elemento pai do botão (elemento <li>)
  const liRemover = element.parentNode;

  // Obtém o elemento <a> dentro do elemento <li> (link do elemento a ser removido)
  const linkElement = liRemover.querySelector('a');

  // Obtém o valor do atributo 'href' do link (URL do elemento a ser removido)
  const url = linkElement.getAttribute('href');

  // Obtém o texto do link (nome do elemento a ser removido)
  const name = linkElement.textContent;

  // Obtém o elemento pai do elemento <li> (elemento <ul>)
  const ul = liRemover.parentNode;

  // Exibe um alerta de confirmação e executa o código se o usuário confirmar a remoção
  if (confirm('Deseja remover esse link?')) {
    try {
      // Faz uma solicitação para 'http://localhost:3000/' com os parâmetros 'name', 'url' e 'del' no método DELETE
      fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`, {
        method: 'DELETE'
      });

      // Remove o elemento <li> da lista
      ul.removeChild(liRemover);
    } catch (error) {
      // Em caso de erro, exibe uma mensagem de erro no console
      console.error('Erro na solicitação para a API', error);
    }
  }
}

// Função que edita um elemento da lista
function editElement(element) {
  // Obtém o elemento pai do botão (elemento <li>)
  const liEditar = element.parentNode;

  // Obtém o elemento <a> dentro do elemento <li> (link do elemento a ser editado)
  const linkElement = liEditar.querySelector('a');

  // Obtém o valor do atributo 'href' do link (URL do elemento a ser editado)
  const url = linkElement.getAttribute('href');

  // Obtém o texto do link (nome do elemento a ser editado)
  const name = linkElement.textContent;

  // Cria um novo elemento <div> para o formulário de edição
  const editarContainer = document.createElement('div');

  // Define o atributo 'id' do elemento <div>
  editarContainer.setAttribute('id', 'div_editar');

  // Cria um novo elemento <label> para o nome do elemento
  const nameLabel = document.createElement('label');

  // Cria um novo elemento <input> para o nome do elemento
  const nameInput = document.createElement('input');

  // Cria um novo elemento <label> para a URL do elemento
  const urlLabel = document.createElement('label');

  // Cria um novo elemento <input> para a URL do elemento
  const urlInput = document.createElement('input');

  // Cria um novo elemento <button> para o botão de salvar
  const saveButton = document.createElement('button');

  // Define o atributo 'id' do elemento <input> para o nome do elemento
  nameInput.setAttribute('id', 'editarInput');

  // Define o atributo 'id' do elemento <input> para a URL do elemento
  urlInput.setAttribute('id', 'editarInput');

  // Define o atributo 'id' do elemento <button> para o botão de salvar
  saveButton.setAttribute('id', 'salvar_1');

  // Define o texto do elemento <label> para 'Nome:'
  nameLabel.textContent = 'Nome:';

  // Define o tipo do elemento <input> para 'text'
  nameInput.type = 'text';

  // Define o valor do elemento <input> para o nome do elemento
  nameInput.value = name;

  // Define o texto do elemento <label> para 'URL:'
  urlLabel.textContent = 'URL:';

  // Define o tipo do elemento <input> para 'text'
  urlInput.type = 'text';

  // Define o valor do elemento <input> para a URL do elemento
  urlInput.value = url;

  // Define o texto do elemento <button> para 'Salvar'
  saveButton.textContent = 'Salvar';

  // Adiciona um ouvinte de evento de clique ao botão de salvar
  saveButton.addEventListener('click', () => {
    // Obtém o novo nome e a nova URL do elemento a ser atualizado
    const newName = nameInput.value;
    const newUrl = urlInput.value;

    // Chama a função 'update' com os novos valores
    update(url, newName, newUrl);
  });

  // Adiciona os elementos ao elemento <div> de edição
  editarContainer.appendChild(nameLabel);
  editarContainer.appendChild(nameInput);
  editarContainer.appendChild(urlLabel);
  editarContainer.appendChild(urlInput);
  editarContainer.appendChild(saveButton);

  // Verifica se o formulário de edição já está aberto no elemento <li>
  const existingForm = liEditar.querySelector('.editar-form');

  // Se o formulário existir, remove-o do elemento <li>
  if (existingForm) {
    liEditar.removeChild(existingForm);
  } else {
    // Caso contrário, adiciona o elemento <div> de edição ao elemento <li>
    editarContainer.classList.add('editar-form');
    liEditar.appendChild(editarContainer);
  }
}

// Função que atualiza um elemento da lista
function update(url, newName, newUrl) {
  // Verifica se o novo nome e a nova URL estão preenchidos
  if (newName && newUrl) {
    try {
      // Faz uma solicitação para 'http://localhost:3000/' com os parâmetros 'update', 'name', 'url' no método PUT
      fetch(`http://localhost:3000/?update=${url}&name=${newName}&url=${newUrl}`, {
        method: 'PUT'
      });

      // Seleciona o link atualizado com base na URL
      const updatedLink = document.querySelector(`a[href="${url}"]`);

      // Atualiza o texto do link com o novo nome
      updatedLink.textContent = newName;

      // Atualiza o atributo 'href' do link com a nova URL
      updatedLink.setAttribute('href', newUrl);

      // Remove os campos de edição após atualizar
      const editarContainer = updatedLink.parentNode.querySelector('div');
      updatedLink.parentNode.removeChild(editarContainer);
    } catch (error) {
      // Em caso de erro, exibe uma mensagem de erro no console
      console.error('Erro na solicitação para a API', error);
    }
  }
}

// Ouve o evento de envio do formulário
form.addEventListener('submit', event => {
  // Impede o comportamento padrão do envio do formulário
  event.preventDefault();

  // Obtém o valor do input
  let { value } = input;

  // Verifica se o valor está preenchido
  if (!value) return alert('Preencha o campo!');

  // Divide o valor em 'name' e 'url' com base na vírgula
  const [name, url] = value.split(',');

  // Verifica se a URL está preenchida corretamente
  if (!url) return alert('O texto não está formatado da maneira correta.');
  if (!/^http/.test(url)) return alert('Digite a URL da maneira correta.');

  // Chama a função 'addElement' com os valores 'name' e 'url'
  addElement({ name, url });

  // Limpa o valor do input
  input.value = '';
});