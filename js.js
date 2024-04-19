const DEFAULT_ID = 1;
const fastFilters = [
  {
    id: DEFAULT_ID,
    name: 'Default Filter',
    criteria: [true, true, false, false],
    isDefault: true
  },
  {"id":2,"name":"Fast filter 2","criteria":[false,false,true,false]},
  {"name":"Work","id":3,"criteria":[true,true,true,true]},
  {"name":"Home","id":4,"criteria":[false,true,true,false]}
];

let currentId = DEFAULT_ID;

const FFList = document.querySelector('.fast-filters__list');
const createBtn = document.querySelector('.fast-filters__create');
const currentName = document.querySelector('.current__title');
const currentNameInput = document.querySelector('.current__name-input');
const criteria = document.querySelectorAll('.criterion__input');
// const saveBtn = document.querySelector('.current__save');

createBtn.addEventListener('click', () => {
  const newFastFilter = createFastFilter();

  fastFilters.push(newFastFilter);
  drawFFList();

  currentId = newFastFilter.id;
  applyFilter();

  currentNameInput.focus();
  currentNameInput.select();
});

currentNameInput.addEventListener('change', (e) => {
  const filter = fastFilters.find(el => el.id == currentId);
  if (!filter) throw "No such filter " + currentId;
  filter.name = e.target.value;
  applyFilter();
  drawFFList();
});
currentNameInput.addEventListener('keydown', e => {
  if (e.key == 'Enter') currentNameInput.blur();
})

criteria.forEach((criterionElement, index) => {
  criterionElement.addEventListener('change', () => {
    const filter = fastFilters.find(el => el.id == currentId);
    if (!filter) throw "No such filter " + currentId;

    filter.criteria[index] = criterionElement.checked;
  });
});

function createFastFilter() {
  const id = createNewId();
  const name = 'My filter ' + id;
  return {
    name,
    id,
    criteria: [false, false, false, false]
  };
}

function createFilterItem({name, id, isDefault}) {
  const filterElement = document.createElement('li');
  filterElement.classList.add('fast-filters__item');

  const nameElement = document.createElement('span');
  nameElement.classList.add('fast-filters__item-name');
  nameElement.textContent = name;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('fast-filters__item-delete');
  if (isDefault) deleteBtn.classList.add('default');
  deleteBtn.textContent = 'x';
  deleteBtn.addEventListener('click', () => {
    const targetIndex = fastFilters.findIndex(filter => filter.id == id);
    fastFilters.splice(targetIndex, 1);
    drawFFList();
    currentId = DEFAULT_ID;
    applyFilter();
  });

  filterElement.addEventListener('click', (e) => {
    if (e.target !== deleteBtn) {
      currentId = id;
      applyFilter();
    }
  });

  filterElement.append(nameElement, deleteBtn);

  return filterElement;
}

function drawFFList() {
  FFList.innerHTML = '';
  FFList.append(...fastFilters.map(createFilterItem));
}

function applyFilter() {
  const filter = fastFilters.find(el => el.id == currentId);
  if (!filter) throw "No such filter " + currentId;

  currentName.textContent = currentNameInput.value = filter.name;
  filter.criteria.forEach((criterion, index) => criteria[index].checked = criterion);
}

function createNewId() {
  const maxId = Math.max(...fastFilters.map(({id}) => id));
  return maxId + 1;
}

drawFFList();
applyFilter();