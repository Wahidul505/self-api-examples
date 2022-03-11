const loadUsers = async () => {
  const response = await fetch('https://randomuser.me/api/?results=100');
  const data = await response.json();
  displayUsers(data.results);
}
loadUsers();
const displayUsers = users => {
  const usersContainer = document.getElementById('users-container');
  users.forEach(user => {
    console.log(user);
    const div = document.createElement('div');
    div.classList.add('user');
    div.innerHTML = `
    <a target="_blank" href="${user.picture.thumbnail}"> 
      <img src="${user.picture.large}"/>
    </a>
    <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
    <h4>
    `
    usersContainer.appendChild(div);
  })
}