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
    { id: 4, title: 'Venta 4', status: 'En Proceso', amount: 964000.00, date: '2021-05-01' },
    { id: 4, title: 'Venta 4', status: 'En Proceso', amount: 964000.00, date: '2021-05-01' },
    { id: 4, title: 'Venta 4', status: 'En Proceso', amount: 964000.00, date: '2021-05-01' },
    { id: 4, title: 'Venta 4', status: 'En Proceso', amount: 964000.00, date: '2021-05-01' },
    { id: 4, title: 'Venta 4', status: 'En Proceso', amount: 964000.00, date: '2021-05-01' },
];

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Render transactions
function renderTransactions() {
    const transactionsContainer = document.getElementById('transactions');
    transactionsContainer.innerHTML = transactions.map(transaction => `
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
    `).join('');
}

// Initialize
renderTransactions();

// Add click handlers to transactions
document.querySelectorAll('.transaction').forEach(transaction => {
    transaction.addEventListener('click', () => {
        console.log('Transaction clicked:', transaction.querySelector('.transaction__title').textContent);
    });
});

// Date range functionality
const fromDateInput = document.getElementById('fromDate');
const toDateInput = document.getElementById('toDate');

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
        // Here you would typically filter the transactions based on the new date range
        // For this example, we'll just log the new range
    }
}

fromDateInput.addEventListener('change', updateDateRange);
toDateInput.addEventListener('change', updateDateRange);

// Calendar icon click handler
document.querySelectorAll('.filters__calendar-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        icon.previousElementSibling.previousElementSibling.showPicker();
    });
});

// Set initial date range (last 30 days)
const today = new Date();
const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));

fromDateInput.valueAsDate = thirtyDaysAgo;
toDateInput.valueAsDate = today;

// Initialize date range
updateDateRange();

