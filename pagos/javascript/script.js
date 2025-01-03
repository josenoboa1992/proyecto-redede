// Menu functionality
const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    menu.classList.toggle('menu--open');
    overlay.classList.toggle('overlay--visible');
}

menuButton.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Get the arrow element
const menuArrow = document.querySelector('.menu__content--secondary img');

// Add click event listener to the arrow
menuArrow.addEventListener('click', toggleMenu);

// Transaction data
const transactions = [
    { id: 1, title: 'Venta 1', status: 'En Proceso', amount: 961000.00, date: '2021-05-01' },
    { id: 2, title: 'Venta 2', status: 'En Proceso', amount: 962000.00, date: '2021-05-01' },
    { id: 3, title: 'Venta 3', status: 'En Proceso', amount: 963000.00, date: '2021-05-01' },
    { id: 4, title: 'Venta 4', status: 'En Proceso', amount: 964000.00, date: '2021-05-01' },
    { id: 5, title: 'Venta 5', status: 'En Proceso', amount: 965000.00, date: '2021-05-01' },
    { id: 6, title: 'Venta 6', status: 'En Proceso', amount: 966000.00, date: '2021-05-01' },
    { id: 7, title: 'Venta 7', status: 'En Proceso', amount: 967000.00, date: '2021-05-01' },
    { id: 8, title: 'Venta 8', status: 'En Proceso', amount: 968000.00, date: '2021-05-01' },
    { id: 9, title: 'Venta 9', status: 'En Proceso', amount: 969000.00, date: '2021-05-01' },
];

function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function renderTransactions(transactionsToRender = transactions) {
    const transactionsContainer = document.getElementById('transactions');
    transactionsContainer.innerHTML = transactionsToRender.map(transaction => `
<a href="/pagos/transaction-detail.html">
        <article class="transaction">
            <div class="transaction__info">
                <p class="transaction__title">${transaction.title}</p>
                <p class="transaction__status">${transaction.status}</p>
            </div>
            <div class="transaction__details">
                <div class="transaction__details--info">
                    <p class="transaction__amount">${formatCurrency(transaction.amount)}</p>
                    <p class="transaction__date">${formatDate(transaction.date)}</p>
                </div>
                <div class="transaction__details--arrow">
                    <span class="transaction__arrow">›</span>
                </div>
            </div>
        </article>
        </a>
    `).join('');
}

function renderSkeletonLoader() {
    const transactionsContainer = document.getElementById('transactions');
    const skeletonHTML = Array(5).fill().map(() => `
        <article class="transaction skeleton">
            <div class="transaction__info">
                <p class="transaction__title"></p>
                <p class="transaction__status"></p>
            </div>
            <div class="transaction__details">
                <div class="transaction__details--info">
                    <p class="transaction__amount"></p>
                    <p class="transaction__date"></p>
                </div>
                <div class="transaction__details--arrow">
                    <span class="transaction__arrow"></span>
                </div>
            </div>
        </article>
    `).join('');
    transactionsContainer.innerHTML = skeletonHTML;
}

renderTransactions();

document.querySelectorAll('.transaction').forEach(transaction => {
    transaction.addEventListener('click', () => {
        console.log('Transaction clicked:', transaction.querySelector('.transaction__title').textContent);
    });
});

const fromDateInput = document.getElementById('fromDate');
const toDateInput = document.getElementById('toDate');

function simulateSearch() {
    renderSkeletonLoader();
    setTimeout(() => {
        const filteredTransactions = transactions.filter(() => Math.random() > 0.5);
        renderTransactions(filteredTransactions);
    }, 2000);
}

function updateDateRange() {
    const fromDate = fromDateInput.value;
    const toDate = toDateInput.value;

    if (fromDate) {
        toDateInput.min = fromDate;
    } else {
        toDateInput.min = '';
    }

    if (toDate) {
        fromDateInput.max = toDate;
    } else {
        fromDateInput.max = '';
    }

    if (fromDate && toDate) {
        console.log('Date range updated:', formatDate(fromDate), 'to', formatDate(toDate));
        simulateSearch();
    }
}

fromDateInput.addEventListener('change', updateDateRange);
toDateInput.addEventListener('change', updateDateRange);

document.querySelectorAll('.filters__calendar-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        icon.previousElementSibling.previousElementSibling.showPicker();
    });
});

const today = new Date();
const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));

fromDateInput.valueAsDate = thirtyDaysAgo;
toDateInput.valueAsDate = today;

updateDateRange();

