document.getElementById('parseMatchButton').addEventListener('click', async () => {
  const files = document.getElementById('cvFiles').files;
  const resultsDiv = document.getElementById('parsedInfo');
  resultsDiv.innerHTML = '<p class="text-[#393E46] italic">Parsing and matching...</p>';

  if (files.length === 0) {
    resultsDiv.innerHTML = '<p class="text-red-500">Please upload one or more CVs.</p>';
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('cvFiles', files[i]);
  }

  try {
    const response = await fetch('/parse_match_cv', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    let html = '';
    if (Array.isArray(data)) {
      data.forEach(result => {
        html += `<div class="mb-4 border border-[#00ADB5] rounded-md p-4">
                    <h3 class="font-semibold text-[#222831] mb-2">File: ${result.filename}</h3>
                    <p class="text-[#393E46]">Match Score: ${result.matchScore}</p>
                    <pre class="bg-[#F0F0F0] p-2 rounded-md overflow-x-auto text-sm">${JSON.stringify(result.parsedInfo, null, 2)}</pre>
                  </div>`;
      });
    } else {
      html = `<p class="text-red-500">Error: ${data.message || 'An unexpected error occurred.'}</p>`;
    }

    resultsDiv.innerHTML = html;
  } catch (error) {
    console.error('Fetch error:', error);
    resultsDiv.innerHTML = `<p class="text-red-500">Error: ${error.message || 'Failed to process CVs.'}</p>`;
  }
});