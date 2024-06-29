async function fetchStationData() {
    const apiUrl = 'https://indian-railways-api.netlify.app/.netlify/functions/station';
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Call the function to fetch the data
fetchStationData();