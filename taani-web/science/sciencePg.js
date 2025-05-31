
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".sensor-card");

    cards.forEach(card => {
        const summary = card.querySelector("summary");

        summary.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default toggle behavior

            const isOpen = card.hasAttribute("open");
            const clickedTop = card.getBoundingClientRect().top;

            // Close all cards first
            cards.forEach(c => c.removeAttribute("open"));

            // If the clicked card wasn't already open, open all in the same row
            if (!isOpen) {
                cards.forEach(c => {
                    const cardTop = c.getBoundingClientRect().top;
                    if (Math.abs(cardTop - clickedTop) < 2) {
                        c.setAttribute("open", true);
                    }
                });
            }
        });
    });
});