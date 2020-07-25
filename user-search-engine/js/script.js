const input = document.querySelector('input');
const button = document.querySelector('button');

const usersTitle = document.querySelector('.users h2');

let tabStatistics = null;
let tabUsers = null;
let container = null;

let allUsers = [];
let filteredUsers = []
let statistics = {
  men: 0,
  women: 0,
  agesSum: 0,
  averageAge: 0.0,
}

window.addEventListener('load', () => {
  tabStatistics = document.querySelector('.statistics');
  tabUsers = document.querySelector('.users');
  container = document.querySelector('.container');

  fetchUsers();

  input.addEventListener("keyup", event => { 
    event.preventDefault();
  
    if (input.value === '') {
      button.disabled = true;
      return
    }

    button.disabled = false;
  })
  
  document.querySelector("form").addEventListener("submit", handleSubmit);
});

async function fetchUsers() {
  setLoading();

  setTimeout(async () => {
    const response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const { results } = await response.json();
    setLoading(false);

    allUsers = results.map(user => {
      const { name: { first, last }, gender, picture: { medium }, dob: { age } } = user;
    
      return {
        name: `${first} ${last}`,
        gender,
        picture: medium,
        age,
      }
    })
  }, 2000);
}

const setLoading = (loading = true) => {
  if (loading) {
    input.disabled = true;
    let loadingEl = document.createElement('div');
    loadingEl.classList.add('col-sm-2');
    loadingEl.setAttribute('id', 'loading');
    loadingEl.innerHTML = `
      <div class="sp sp-wave"></div>
    `
    container.appendChild(loadingEl);
  } else {
    document.querySelector('#loading').remove();
    input.disabled = false;
    input.focus();
  }
}

const handleSubmit = async event => {
  event.preventDefault();

  filteredUsers = [];
  const { value } = input;

  const regex = new RegExp(value, 'i');
  filteredUsers = allUsers.filter(user => regex.test(user.name));
  
  if (!filteredUsers.length) {
    tabUsers.style.marginTop = '60px';
  } else {
    tabUsers.style.marginTop = '30px';
  }

  filteredUsers.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  render();
}

const render = () => {
  renderUsers();
  renderStatistics();
}

const renderUsers = () => {
  tabUsers.innerHTML = '';
  let usersHTML = '<div class="users-container">';
  
  if(filteredUsers.length) {
    usersTitle.textContent = `Found ${filteredUsers.length} users`
    filteredUsers.forEach(user => {
      const {name, picture, age } = user;
  
      let userHTML = `
        <div class="user">
          <img src="${picture}" alt="${name}">
          <div>
            <span><strong>${name}</strong>, ${age}</span>
          </div>
        </div>
      `;

      usersHTML += userHTML;
    });

    usersHTML += '</div>';
    tabUsers.appendChild(usersTitle);
    tabUsers.innerHTML += usersHTML;
    tabStatistics.classList.remove('hide');
  } else {
    usersTitle.textContent = `No results for: '${input.value}'`
    tabUsers.style.marginTop = '60px';
    tabUsers.appendChild(usersTitle);
    tabStatistics.classList.add('hide');
  }
}

const renderStatistics = () => {
  tabStatistics.innerHTML = '';

  if (!filteredUsers.length) {
    statistics = {
      men: 0,
      women: 0,
      agesSum: 0,
      averageAge: 0.0,
    }

    return;
  }
  
  statistics.men = filteredUsers.filter(user => user.gender === 'male').length;
  statistics.women = filteredUsers.filter(user => user.gender === 'female').length;
  statistics.agesSum = filteredUsers.reduce((acc, nextUser) => acc += nextUser.age, 0);
  statistics.averageAge = (statistics.agesSum / filteredUsers.length).toFixed(2);

  tabStatistics.innerHTML += `
    <h2>Statistics</h2>
    <div>
      <span><strong>Men: </strong>${statistics.men}</span>
      <span><strong>Women: </strong>${statistics.women}</span>
      <span><strong>Ages sum: </strong>${statistics.agesSum}</span>
      <span><strong>Average age: </strong>${statistics.averageAge}</span>
    </div>
  ` 
}

