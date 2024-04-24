const tbody = document.querySelector('tbody')
const userRow = document.querySelector('.user-row')

const emptyTable = `
    <tr>
        <td colspan="4" class="empty">
            <p>
            <img src="assets/favicon.svg" alt="Ícone estrela" />
            Nenhum favorito ainda
            </p>
        </td>
    </tr>
`

if(userRow === null){
    tbody.innerHTML = emptyTable
}
console.log(userRow)