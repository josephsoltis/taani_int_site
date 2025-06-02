
// search feature
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', (e) => {
    if (!searchForm.classList.contains('expanded')) {
        e.preventDefault(); // prevent submitting form on first click
        searchForm.classList.add('expanded');
        searchInput.focus();
    }
});




// Mock FAQ Data
const faqs = [
    { id: 1, category: 'general', question: 'What is the research vessel?', answer: 'The research vessel is designed for ocean research.' },
    { id: 2, category: 'safety', question: 'What safety procedures are followed?', answer: 'We follow strict safety protocols for all operations.' },
    { id: 3, category: 'crew', question: 'How are operations coordinated?', answer: 'Operations are coordinated with the onboard team and shore support.' },
    { id: 4, category: 'science', question: 'How does the technical equipment work?', answer: 'The equipment is calibrated and tested regularly.' },
    // Add more FAQs...
];

let currentPage = 1;
const resultsPerPage = 3;
let filteredFAQs = [...faqs];

// Display FAQs for a specific category
function filterFAQs(category) {
    filteredFAQs = faqs.filter(faq => faq.category === category);
    displayFAQs();
}

// Display FAQs based on search
document.getElementById('search-bar').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    filteredFAQs = faqs.filter(faq => faq.question.toLowerCase().includes(query));
    displayFAQs();
});

// Toggle the expanded state of each FAQ
function toggleAnswer(id) {
    const faqItem = document.getElementById(`faq-${id}`);
    faqItem.classList.toggle('expanded');
}

// Display FAQs with pagination
function displayFAQs() {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const visibleFAQs = filteredFAQs.slice(startIndex, endIndex);

    const faqList = document.getElementById('faq-list');
    faqList.innerHTML = '';

    visibleFAQs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');
        faqItem.id = `faq-${faq.id}`;

        const question = document.createElement('h3');
        question.textContent = faq.question;
        question.onclick = () => toggleAnswer(faq.id);

        const answer = document.createElement('div');
        answer.classList.add('answer');
        answer.textContent = faq.answer;

        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        faqList.appendChild(faqItem);
    });

    updatePagination();
}

// Update pagination buttons
function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredFAQs.length / resultsPerPage);

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.classList.add('page-button');
        prevButton.onclick = () => changePage(currentPage - 1);
        pagination.appendChild(prevButton);
    }

    const pageButton = document.createElement('button');
    pageButton.textContent = `Page ${currentPage}`;
    pageButton.classList.add('page-button');
    pagination.appendChild(pageButton);

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.classList.add('page-button');
        nextButton.onclick = () => changePage(currentPage + 1);
        pagination.appendChild(nextButton);
    }
}

// Change the current page
function changePage(page) {
    currentPage = page;
    displayFAQs();
}

// Initialize the page
displayFAQs();
