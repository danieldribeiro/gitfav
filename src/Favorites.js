//Classe para lógica dos dados como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);

    this.getUsers = () => {
      const endpoint = `https://api.github.com/users/danieldribeiro`;
      fetch(endpoint)
        .then((data) => data.json())
        .then(({login, name, public_repos, followers}) => console.log(login, name, public_repos, followers));
    };

    // addUser(username){

    // }
  }
}

//Classe para criar as visualizações html e gerenciar eventos
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.update();
  }

  onFavorite() {
    const favoriteButton = document.querySelector("#favorite-btn");
    favoriteButton.addEventListener("click", () => {
      const { value } = document.querySelector("input");
      this.addUser(value);
    });
  }

  update() {
    this.clearTable();
    this.getUsers();
    this.onFavorite();
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
    const usersTable = `
      <tr class="user-row">
        <td class="user">
          <img src="https://avatars.githubusercontent.com/u/74836636?v=4" alt="user image" class="user-image">                    
          <a href="https://github.com/danieldribeiro" target="_blank">
              <p>Daniel Ribeiro</p>
              <span>/danieldribeiro</span>
          </a>
        </td>
        <td>25</td>
        <td>114</td>
        <td class="remove">Remover</td>
      </tr>
    `

    return usersTable
  }
}