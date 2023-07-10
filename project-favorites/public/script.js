const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

async function load() {
  const res = await fetch('http://localhost:3000/').then(data => data.json());
  res.urls.map(({ name, url }) => addElementApi({ name, url }));
}

load();

function addElement({ name, url }) {
  const li = document.createElement('li');
  li.innerHTML = `
    <a href="${url}">${name}</a>
    <input type="button" id="remover" onclick="removeElement(this)" class="botao" value="Remover">
    <input type="button" id="editar" onclick="editElement(this)" class="botao" value="Editar">
  `;
  ul.appendChild(li);
  try {
    fetch(`http://localhost:3000/?name=${name}&url=${url}`, { method: 'POST' });
    return;
  } catch (error) {
    console.log('Erro na requisição');
  }
}

function addElementApi({ name, url }) {
  const li = document.createElement('li');
  li.innerHTML = `
    <a href="${url}">${name}</a>
    <input type="button" id="remover" onclick="removeElement(this)" class="botao" value="Remover">
    <input type="button" id="editar" onclick="editElement(this)" class="botao" value="Editar">
  `;
  ul.appendChild(li);
}

function removeElement(element) {
  const liRemover = element.parentNode;
  const linkElement = liRemover.querySelector('a');
  const url = linkElement.getAttribute('href');
  const name = linkElement.textContent;
  const ul = liRemover.parentNode;

  if (confirm('Deseja remover esse link?')) {
    try {
      fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`, {
        method: 'DELETE'
      });

      ul.removeChild(liRemover);
    } catch (error) {
      console.error('Erro na solicitação para a API', error);
    }
  }
}

function editElement(element) {
  element.disabled = true
  const liEditar = element.parentNode;
  const linkElement = liEditar.querySelector('a');
  const url = linkElement.getAttribute('href');
  const name = linkElement.textContent;

  const editarContainer = document.createElement('div');
  editarContainer.setAttribute('id','div_editar')
  const nameLabel = document.createElement('label');
  const nameInput = document.createElement('input');
  const urlLabel = document.createElement('label');
  const urlInput = document.createElement('input');
  const saveButton = document.createElement('button');
  nameInput.setAttribute('id','editarInput');
  urlInput.setAttribute('id','editarInput');

  saveButton.setAttribute('id','salvar')

  nameLabel.textContent = 'Nome:';
  nameInput.type = 'text';
  nameInput.value = name;

  urlLabel.textContent = 'URL:';
  urlInput.type = 'text';
  urlInput.value = url;

  saveButton.textContent = 'Salvar';

  saveButton.addEventListener('click', () => {
    const newName = nameInput.value;
    const newUrl = urlInput.value;
    update(url, newName, newUrl);
  });

  editarContainer.appendChild(nameLabel);
  editarContainer.appendChild(nameInput);
  editarContainer.appendChild(urlLabel);
  editarContainer.appendChild(urlInput);
  editarContainer.appendChild(saveButton);

  liEditar.appendChild(editarContainer);
}

function update(url, newName, newUrl) {
  if (newName && newUrl) {
    try {
      fetch(`http://localhost:3000/?update=${url}&name=${newName}&url=${newUrl}`, {
        method: 'PUT'
      });

      const updatedLink = document.querySelector(`a[href="${url}"]`);
      updatedLink.textContent = newName;
      updatedLink.setAttribute('href', newUrl);

      // Remover os campos de edição após atualizar
      const editarContainer = updatedLink.parentNode.querySelector('div');
      updatedLink.parentNode.removeChild(editarContainer);
    } catch (error) {
      console.error('Erro na solicitação para a API', error);
    }
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert('Preencha o campo!');

  const [name, url] = value.split(',');

  if (!url) return alert('O texto não está formatado da maneira correta.');
  if (!/^http/.test(url)) return alert('Digite a URL da maneira correta.');

  addElement({ name, url });

  input.value = '';
});
