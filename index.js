const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2509-PT-Ricky";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// State
let parties = [];
let selectParty;

// Get party data from API
async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

// Get party by ID to update state
async function getParty(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

// Components

//Party Item and listener
function PartyListItem(party) {
  const $li = document.createElement("li");

  if (party.id === selectParty?.id) {
    $li.classList.add("selected");
  }

  $li.innerHTML = `
    <a href="#selected">${party.name}</a>
  `;
  $li.addEventListener("click", () => getParty(party.id));
  return $li;
}

//List of parties
function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("parties");
  const $parties = parties.map(PartyListItem);
  $ul.replaceChildren(...$parties);

  return $ul;
}

// Party details when selected
function SelectParty() {
  if (!selectParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $party = document.createElement("section");
  $party.innerHTML = `
    <h3>${selectParty.name} #${selectParty.id}</h3>
    <time datetime="${selectParty.date}">
      ${selectParty.date.slice(0, 10)}
    </time>
    <address>${selectParty.location}</address>
    <p>${selectParty.description}</p>
  `;
  return $party;
}
