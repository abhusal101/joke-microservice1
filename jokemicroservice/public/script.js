document.addEventListener('DOMContentLoaded', () => {
    const jokeTypeSelect = document.getElementById('jokeType');
    const getJokeBtn = document.getElementById('getJokeBtn');
    const jokeContainer = document.getElementById('jokeContainer');

    // Function to fetch and populate joke types
    function populateJokeTypes() {
        console.log('Populating joke types...');
        fetch('/type')
            .then(response => response.json())
            .then(types => {
                console.log('Received joke types:', types);
                // Clear existing options
                jokeTypeSelect.innerHTML = '';
                // Populate dropdown menu with types
                types.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type;
                    option.textContent = type;
                    jokeTypeSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching joke types:', error));
    }

    // Populate joke types on page load
    populateJokeTypes();

    // Refresh joke types on dropdown menu interaction
    //jokeTypeSelect.addEventListener('change', populateJokeTypes);

   // Refresh joke types on dropdown menu interaction
    // jokeTypeSelect.addEventListener('change', () => {
    //     console.log('Dropdown menu selection changed');
    //     populateJokeTypes();
    // });

    // Add event listener to the "Get Joke" button
    getJokeBtn.addEventListener('click', () => {
        // Repopulate joke types when the button is clicked
        //populateJokeTypes();

        // // Prevent the default form submission behavior
        // event.populateJokeTypes();

        // Log the selected type to verify
        //console.log('Selected type:', jokeTypeSelect.value);

        const selectedType = jokeTypeSelect.value;
        fetch(`/joke?type=${selectedType}`)
            .then(response => response.json())
            .then(jokes => {
                jokeContainer.innerHTML = '';
                if (Array.isArray(jokes)) {
                    jokes.forEach(joke => {
                        const jokeElement = document.createElement('div');
                        jokeElement.textContent = `${joke.setup} ${joke.punchline}`;
                        jokeContainer.appendChild(jokeElement);
                    });
                } else {
                    const jokeElement = document.createElement('div');
                    jokeElement.textContent = `${jokes.setup} ${jokes.punchline}`;
                    jokeContainer.appendChild(jokeElement);
                }
            })
            .catch(error => console.error('Error fetching joke:', error));
    });
});
