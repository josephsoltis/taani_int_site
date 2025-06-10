const DATA_LOCATION_STRING = `https://10.129.222.80/demo/api`;



/* navdisplay box section */



async function getData(targetID) {
    try {
        const response = await fetch(`${DATA_LOCATION_STRING}/last_obs/?format=json`);
        const jsondata_lastobs = await response.json();
        let value = null;

        jsondata_lastobs.features.forEach((item) => {
            if (item.id === targetID) {
                value = parseFloat(item.properties.value);
            }
        });

        return value;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

// Function to update the DOM with live data
async function updateLiveData() {
    const temp = await getData(3854); // correct ID for temperature
    const wind = await getData(2833); // correct ID for wind
    const pitch = await getData(3); // Replace 3 with the correct ID for pitch
    const roll = await getData(4); // Replace 4 with the correct ID for roll
    const heave = await getData(5); // Replace 5 with the correct ID for heave
    /* need to have lat and long values */

    // Update the DOM elements
    document.getElementById("temp").textContent = temp !== null ? `${temp}°C` : "N/A";
    document.getElementById("wind").textContent = wind !== null ? `${wind} m/s NW` : "N/A";/* need to figure out wind direction */
    document.getElementById("pitch").textContent = pitch !== null ? `${pitch}°` : "N/A";
    document.getElementById("roll").textContent = roll !== null ? `${roll}°` : "N/A";
    document.getElementById("heave").textContent = heave !== null ? `${heave}°` : "N/A";
}

// Call the function to update data initially
updateLiveData();

// Optionally, set an interval to refresh the data periodically (e.g., every 10 seconds)
setInterval(updateLiveData, 10000);



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
