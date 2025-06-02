
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
