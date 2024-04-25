export class GetUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`;

    return fetch(endpoint)
      .then((data) => data.json())
      .then(({ id, login, name, public_repos, followers }, userId) => ({
        id,
        login,
        name,
        public_repos,
        followers,
      }));
  }
}
