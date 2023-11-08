import * as bootstrap from 'bootstrap';
import './style.scss';
import { data } from './data';
import { nav } from './nav';

import Fuse from 'fuse.js'

//barre de recherche
const Fuse = require('fuse.js')

const options = 
{
  keys: ['nom', 'prenom'],
};

const search = (term) => {
  const result = Fuse.search(term);
  return result.map(item => item.item);
};

// Utilisation de Fuse.js dans la barre de recherche
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value;
  const filteredData = search(searchTerm);
  // Reste du code pour mettre à jour la liste de personnes
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
        ${listePersonnes()}
      </div>
    </div>
  </main>

  <footer>
    <div>yo</div>
  </footer>
`;
