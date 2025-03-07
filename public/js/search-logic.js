const apiKey = 'AIzaSyAV6-hb4AJjgRS2cVuLIEeiQg7esmNO1a0';  

// Function to handle search logic
async function searchVideos() {
  const query = document.getElementById('searchQuery').value.trim();
  if (!query) {
    alert('Please enter a search query.');
    return;
  }

  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '<p class="text-gray-500 text-lg">Searching...</p>';

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=14`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.items) {
      resultsContainer.innerHTML = data.items.map(item => `
        <div class="p-4 rounded shadow-md w-108">
          <iframe width="480" height="270" src="https://www.youtube.com/embed/${item.id.videoId}" title="${item.snippet.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  
          <p class="text-orange-400">${item.snippet.title}</p>
        </div>
      `).join('');
    } else {
      resultsContainer.innerHTML = '<p class="text-red-500 text-lg">No results found.</p>';
    }
  } catch (error) {
    resultsContainer.innerHTML = `<p class="text-red-500 text-lg">Error fetching data: ${error.message}</p>`;
  }
}

// Clear search results function
function clearSearchResults() {
  document.getElementById('searchQuery').value = '';
  document.getElementById('resultsContainer').innerHTML = '';
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', searchVideos);

// Event listener for the clear button
document.getElementById('clearButton').addEventListener('click', clearSearchResults);

// Event listener for the Enter key
document.getElementById('searchQuery').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchVideos();
  }
});