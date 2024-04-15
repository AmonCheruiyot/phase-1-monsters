const URL_PREFIX = 'http://localhost:3000/';
let currentPage = 1;
const monstersPerPage = 50;

function getMonsters(page) {
    fetch(`${URL_PREFIX}monsters/?_limit=${monstersPerPage}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            monsters.forEach(monster => createMonsterCard(monster));
        });
}

function createMonsterCard(monster) {
    const monsterContainer = document.querySelector('#monster-container');
    const monsterDiv = document.createElement('div');
    monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterDiv);
}

function createMonsterForm() {
    const monsterForm = document.createElement('form');
    monsterForm.id = 'monster-form';
    monsterForm.innerHTML = `
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button type="submit">Create</button>
    `;
    document.querySelector('#create-monster').appendChild(monsterForm);
    addSubmitEventListener();
}

function addSubmitEventListener() {
    document.querySelector('#monster-form').addEventListener('submit', event => {
        event.preventDefault();
        const formData = getFormData();
        postNewMonster(formData);
        clearForm();
    });
}

function getFormData() {
    const name = document.querySelector('#name').value;
    const age = parseFloat(document.querySelector('#age').value);
    const description = document.querySelector('#description').value;
    return { name, age, description };
}

function postNewMonster(data) {
    fetch(`${URL_PREFIX}monsters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(newMonster => console.log('New monster created:', newMonster))
    .catch(error => console.error('Error creating monster:', error));
}

function clearForm() {
    document.querySelector('#monster-form').reset();
}

function addNavListeners() {
    document.querySelector('#back').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            getMonsters(currentPage);
        } else {
            alert('Ain\'t no monsters here');
        }
    });

    document.querySelector('#forward').addEventListener('click', () => {
        currentPage++;
        getMonsters(currentPage);
    });
}

function init() {
    getMonsters(currentPage);
    createMonsterForm();
    addNavListeners();
}

document.addEventListener('DOMContentLoaded', init);
