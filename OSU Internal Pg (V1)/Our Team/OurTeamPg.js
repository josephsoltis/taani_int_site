// team meber photo js/

document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        member.addEventListener('click', () => {
            const expanded = member.getAttribute('data-expanded') === 'true';
            member.setAttribute('data-expanded', !expanded);
            member.classList.toggle('expanded', !expanded);
        });
    });
});