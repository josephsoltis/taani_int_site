document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const input = document.getElementById('search-input');

    form.addEventListener('submit', e => {
        e.preventDefault(); // stop form from submitting normally
        const query = input.value.trim();

        if (query) {
            // Get current base path to taani-web
            const base = window.location.pathname.split('/taani-web/')[0] + '/taani-web/';
            const pathToResults = `${base}search/search-results.html?q=${encodeURIComponent(query)}`;

            window.location.href = pathToResults;
        }
    });
});
