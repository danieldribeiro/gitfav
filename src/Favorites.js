import { GetUser } from "./GetUsers.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.favorites = [];
    this.load()
  }

  load(){
    this.favorites = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save(){
    localStorage.setItem('@github-favorites:', JSON.stringify(this.favorites))
  }

  async add(username){

    try{
      const existUser = this.favorites.find(user => user.login === username)
      
      if(existUser){
        throw new Error('O usuário já existe')
      }

      const user = await GetUser.search(username);

      if(user.login === undefined) throw new Error('Usuário não encontrado')

      this.favorites = [...this.favorites, user];
      this.update()
      this.save()
      
    } catch(err){
      alert(err.message)
    }
  }
}


export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.onFavorite()
    this.update()
  }

  onFavorite() {
    const favoriteButton = document.querySelector("#favorite-btn");
    favoriteButton.addEventListener("click", () => {
      const { value } = document.querySelector("input");
      this.add(value);
    });

    const input = document.querySelector('input')
    input.addEventListener('keypress', (e) => {
      if(e.key === 'Enter'){
        this.add(input.value)
      }
      input.value = ''
      input.focus()
    })
  }

  onDelete(){
    if(this.favorites.length > 0){
      const deleteButton = document.querySelector('#delete-btn')
      deleteButton.addEventListener('click', () => {
        this.favorites = []
        this.clearTable()
        this.update()
        this.save()
      })
    }
  }

  update() {
    this.clearTable();
    this.favorites.forEach((user) => {
      const row = this.createUsersRows()

      row.querySelector('img').src = `https://github.com/${user.login}.png`
      row.querySelector('img').alt = `Imagem de ${user.login}`
      row.querySelector('a').href = `https://github.com/${user.login}`
      row.querySelector('p').textContent = user.name
      row.querySelector('span').textContent = user.login
      row.querySelector('#repos').textContent = user.public_repos
      row.querySelector('#followers').textContent = user.followers

      this.root.append(row)

      this.onDelete()
    });
  }

  clearTable() {
    const tbody = this.root;
    const tr = document.querySelector("tr");
    tbody.innerHTML = this.createEmptyRow();
  }

  createEmptyRow(){
    const emptyTable = `
      <tr class = "empty">
        <td colspan="4">
            <p>
            <img src="assets/favicon.svg" alt="Ícone estrela" />
            Nenhum favorito ainda
            </p>
        </td>
      </tr>
    `

    return emptyTable
  }

  createUsersRows(){
    const tr = this.root.querySelector('tr')

    if(tr.classList.contains('empty')){
      tr.innerHTML = ''
    }

    const usersTable = document.createElement('tr')

    usersTable.classList.add('user-row')
    usersTable.innerHTML =`
        <td class="user">
          <img src="https://avatars.githubusercontent.com/u/74836636?v=4" alt="user image" class="user-image">                    
          <a href="https://github.com/danieldribeiro" target="_blank">
              <p>Daniel Ribeiro</p>
              <span>/danieldribeiro</span>
          </a>
        </td>
        <td id="repos">25</td>
        <td id="followers">114</td>
        <td id="delete-btn" class="remove">Remover</td>
    `
    return usersTable
  }
}