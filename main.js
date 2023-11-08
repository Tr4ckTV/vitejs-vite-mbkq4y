import * as bootstrap from 'bootstrap';
import './style.scss';
import { data } from './data';
import { nav } from './nav';

import Fuse from 'fuse.js'

const fuseExact = new Fuse(data, {
  keys: ['prenom', 'nom'],
  threshold: 0.2,
  minMatchCharLength: 3,
  useExtendedSearch: true,
});

const fuseStartsWith = new Fuse(data, {
  keys: ['prenom', 'nom'],
  threshold: 0.1,
  minMatchCharLength: 1,
  useExtendedSearch: true,
});

//triage 
data.sort((a, b) => {
  const prenomA = a.prenom;
  const prenomB = b.prenom;

  if (true) 
  {
    return prenomB.localeCompare(prenomA);
  } 
  else
  {}
});

//reste

const listePersonnes = () => {
  let html = '';
  for (let i = 0; i < data.length; i++) {
    const personne = data[i];
    let personneCard = `
      <a class="card col-5 col-md-3" href="/personne/?id=${personne.id}">
        <img src="${personne.avatar}" class="card-img-top" alt="avatar de ${personne.prenom} ${personne.nom}">
        <div class="card-body">
          <h5 class="card-title">${personne.prenom} ${personne.nom}</h5>
        </div>
      </a>
    `;
    html += personneCard;
  }
  return html;
};

document.querySelector('#app').innerHTML = `
  <main>
    ${nav}

    <div class="container-fluid my-4">
      <div class="d-flex gap-3 flex-wrap justify-content-center">
        <input type="text" id="searchInput" placeholder="Rechercher...">
      </div>
    </div>

    <div class="container-fluid my-4">
      <div class="d-flex gap-3 flex-wrap justify-content-center">
        ${listePersonnes()}
      </div>
    </div>
  </main>

  <footer>
    <div>yo</div>
  </footer>
`;


function handleSearch() 
{
  const searchText = searchInput.value;

  if (searchText === '') 
  {
    document.querySelector('#personList').innerHTML = listePersonnes();
  }
  else 
  {
    const resultExact = fuseExact.search(searchText);
    const resultStartsWith = fuseStartsWith.search(searchText);
    const combinedResults = [...resultExact, ...resultStartsWith];
    const uniqueResults = Array.from(new Set(combinedResults.map((item) => item.item.id)));
    const filteredData = uniqueResults.map((id) => data.find((item) => item.id === id));
    document.querySelector('#personList').innerHTML = listePersonnes(filteredData);
  }
}

searchInput.addEventListener('input', handleSearch);
