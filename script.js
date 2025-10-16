async function loadJSON(filename) {
  const tableHeader = document.getElementById('tableHeader');
  const tableBody = document.getElementById('tableBody');

  // Clear table
  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  try {
    const response = await fetch(filename);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="100%">No data available</td></tr>';
      return;
    }

    // Generate table headers
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    // Generate rows
    data.forEach(row => {
      const tr = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = row[header];
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });

  } catch (error) {
    console.error('Error loading JSON:', error);
    tableBody.innerHTML = `<tr><td colspan="100%">⚠️ Error loading ${filename}: ${error.message}</td></tr>`;
  }
}

// Initial load
loadJSON('Cooper.json');

// Listen to dropdown change
document.getElementById('jsonSelect').addEventListener('change', function () {
  loadJSON(this.value);
});
