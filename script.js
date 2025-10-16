async function start(name) {
   const jsonData = await (await fetch(name)).json();

   // Get table elements
   const tableHeader = document.getElementById('tableHeader');
   const tableBody = document.getElementById('tableBody');

   // Clear existing table
   tableHeader.innerHTML = '';
   tableBody.innerHTML = '';

   // Generate table headers dynamically
   const headers = Object.keys(jsonData[0]);
   headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      tableHeader.appendChild(th);
   });

   // Generate table rows dynamically
   jsonData.forEach(row => {
      const tr = document.createElement('tr');
      headers.forEach(header => {
         const td = document.createElement('td');
         td.textContent = row[header];
         tr.appendChild(td);
      });
      tableBody.appendChild(tr);
   });
}

// Initial load
start('Cooper.JSON');

// Dropdown event listener
document.getElementById('jsonSelect').addEventListener('change', function () {
   const selectedFile = this.value;
   start(selectedFile);
});
