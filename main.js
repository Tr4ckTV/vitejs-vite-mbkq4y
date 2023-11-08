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

const listePersonnes = (Data = data) => {
  let html = '';
  for (let i = 0; i < Data.length; i++) {
    const personne = Data[i];
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
      <div class="d-flex gap-3 flex-wrap justify-content-center" id="personList">
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
    const uniqueResults = Array.from(new Set(combinedResults.map((item) => item.item.prenom)));
    const Data = uniqueResults.map((prenom) => data.find((item) => item.prenom === prenom));
    document.querySelector('#personList').innerHTML = listePersonnes(Data);
  }
}
 
searchInput.addEventListener('input', handleSearch);
