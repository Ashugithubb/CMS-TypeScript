type University = {
  logo: string;
  name: string;
  type: string;
  year: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  students: string;
};

document.addEventListener("DOMContentLoaded", () => {
  const savedData: University[] = JSON.parse(localStorage.getItem("universities") || "[]");
  savedData.forEach((data: University) => addRowToTable(data));
});

const form = document.getElementById("universityForm") as HTMLFormElement;
form.addEventListener("submit", function (e: Event) {
  e.preventDefault();

  const data: University = {
    logo: (document.getElementById("Logo") as HTMLInputElement).value,
    name: (document.getElementById("name") as HTMLInputElement).value,
    type: (document.getElementById("type") as HTMLInputElement).value,
    year: (document.getElementById("year") as HTMLInputElement).value,
    country: (document.getElementById("country") as HTMLInputElement).value,
    phone: (document.getElementById("phone") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    website: (document.getElementById("website") as HTMLInputElement).value,
    students: (document.getElementById("students") as HTMLInputElement).value,
  };

  addRowToTable(data);
  saveToLocalStorage(data);
  form.reset();
});

function addRowToTable(data: University): void {
  const table = document.getElementById("universityTableBody") as HTMLTableSectionElement;
  const row = table.insertRow();

  row.innerHTML = `
    <td><img src="${data.logo}" alt="Logo" width="80px" height="70px"></td>
    <td>${data.name}</td>
    <td>${data.type}</td>
    <td>${data.year}</td>
    <td>${data.country}</td>
    <td>${data.phone}</td>
    <td>${data.email}</td>
    <td><a href="${data.website}" target="_blank">${data.website}</a></td>
    <td>${data.students}</td>
    <td>
      <button onclick="editRow(this)"><i class="fa-solid fa-pen-to-square"></i></button>
      <button style="color: red" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button>
    </td>
  `;
}

function saveToLocalStorage(data: University): void {
  const universities: University[] = JSON.parse(localStorage.getItem("universities") || "[]");
  universities.push(data);
  localStorage.setItem("universities", JSON.stringify(universities));
}

function removeFromLocalStorage(name: string): void {
  let universities: University[] = JSON.parse(localStorage.getItem("universities") || "[]");
  universities = universities.filter((u) => u.name !== name);
  localStorage.setItem("universities", JSON.stringify(universities));
}

function editRow(button: HTMLElement): void {
  const row = button.parentElement?.parentElement as HTMLTableRowElement;
  const cells = row.children;

  (document.getElementById("Logo") as HTMLInputElement).value = (cells[0].querySelector("img") as HTMLImageElement).src;
  (document.getElementById("name") as HTMLInputElement).value = cells[1].textContent || "";
  (document.getElementById("type") as HTMLInputElement).value = cells[2].textContent || "";
  (document.getElementById("year") as HTMLInputElement).value = cells[3].textContent || "";
  (document.getElementById("country") as HTMLInputElement).value = cells[4].textContent || "";
  (document.getElementById("phone") as HTMLInputElement).value = cells[5].textContent || "";
  (document.getElementById("email") as HTMLInputElement).value = cells[6].textContent || "";
  (document.getElementById("website") as HTMLInputElement).value = (cells[7].querySelector("a") as HTMLAnchorElement).href;
  (document.getElementById("students") as HTMLInputElement).value = cells[8].textContent || "";

  const nameToDelete = cells[1].textContent || "";
  removeFromLocalStorage(nameToDelete);
  row.remove();
}

function deleteRow(button: HTMLElement): void {
  const row = button.parentElement?.parentElement as HTMLTableRowElement;
  const nameToDelete = row.children[1].textContent || "";
  removeFromLocalStorage(nameToDelete);
  row.remove();
}

function searchByName(): void {
  const searchValue = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase();
  const universities: University[] = JSON.parse(localStorage.getItem("universities") || "[]");
  const filtered = universities.filter((u) => u.name.toLowerCase().includes(searchValue));

  const tableBody = document.getElementById("universityTableBody") as HTMLTableSectionElement;
  tableBody.innerHTML = "";
  filtered.forEach((data: University) => addRowToTable(data));
}

function resetSearch(): void {
  (document.getElementById("searchInput") as HTMLInputElement).value = "";
  searchByName();
}

function exportCSV(): void {
  const data: University[] = JSON.parse(localStorage.getItem("universities") || "[]");
  if (data.length === 0) {
    alert("No data to export.");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(",")];

  for (const row of data) {
    const values = headers.map((header) =>
      `"${(row as any)[header]?.toString().replace(/"/g, '""') || ""}"`
    );
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "universities.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function importCSV(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const content = e.target?.result as string;
    const lines = content.trim().split("\n");
    const headers = lines[0].split(",");

    const universities: University[] = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.replace(/^"|"$/g, "").replace(/""/g, '"'));
      const entry: any = {};
      headers.forEach((header, i) => {
        entry[header.trim()] = values[i]?.trim() || "";
      });
      return entry as University;
    });

    universities.forEach((data) => addRowToTable(data));
    localStorage.setItem("universities", JSON.stringify(universities));
    alert("CSV data imported successfully!");
  };
  reader.readAsText(file);
}

function logout(): void {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "index.html";
}

function filterByType(): void {
  const filter = (document.getElementById("typeFilter") as HTMLSelectElement).value.toLowerCase();
  const table = document.querySelector("table") as HTMLTableElement;
  const rows = table.tBodies[0].rows;

  for (let row of Array.from(rows)) {
    const typeCell = row.cells[2].textContent?.toLowerCase() || "";
    row.style.display = filter === "" || typeCell === filter ? "" : "none";
  }
}
