// Cooper helped me with a lot of this code and AI was used in making this code
async function loadJSON(filename) {
  // This gets table elements from index.html
  const tableHeader = document.getElementById("tableHeader");
  const tableBody = document.getElementById("tableBody");
  
  // Clear table
  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

// Fetch JSON data
  try {
    const response = await fetch(filename);
// Checks for HTTP errors (e.g. status NOT in the region of 200 - 299)
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
// Parse JSON data
    const data = await response.json();
// Check if data is an array and has content
    if (!Array.isArray(data) || data.length === 0) {
// If no data, display the below message
      tableBody.innerHTML =
        '<tr><td colspan="100%">No data available</td></tr>';
      return;
    }
// Generate table headers
    const headers = Object.keys(data[0]);
// Create header row
    const headerRow = document.createElement("tr");
// Create and append table header elements for each header
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
  // Append header row to table header
    tableHeader.appendChild(headerRow);

  // Generate rows
    data.forEach((row) => {
  // Create a table row
      const tr = document.createElement("tr");
      headers.forEach((header) => {
  // Create and append table data elements for each cell
        const td = document.createElement("td");
  // Set cell text content 
        td.textContent = row[header];
  // Append cell to row
        tr.appendChild(td);
      });
    
      tableBody.appendChild(tr);
    });
  // Catches and Displays an error message if an error occurs loading the JSON
  } catch (error) {
    console.error("Error loading JSON:", error);
    tableBody.innerHTML = `<tr><td colspan="100%">Sorry there was a problem loading ${filename}!: ${error.message}</td></tr>`;
  }
}

// Initial load...aka the first schedule that comes on the website
loadJSON("Layla.json");

// Listens to dropdown change
document.getElementById("jsonSelect").addEventListener("change", function () {
  loadJSON(this.value);
});
