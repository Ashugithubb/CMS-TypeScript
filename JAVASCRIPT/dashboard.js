"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const savedData = JSON.parse(localStorage.getItem("universities") || "[]");
    savedData.forEach((data) => addRowToTable(data));
});
const form = document.getElementById("universityForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        logo: document.getElementById("Logo").value,
        name: document.getElementById("name").value,
        type: document.getElementById("type").value,
        year: document.getElementById("year").value,
        country: document.getElementById("country").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        website: document.getElementById("website").value,
        students: document.getElementById("students").value,
    };
    addRowToTable(data);
    saveToLocalStorage(data);
    form.reset();
});
function addRowToTable(data) {
    const table = document.getElementById("universityTableBody");
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
function saveToLocalStorage(data) {
    const universities = JSON.parse(localStorage.getItem("universities") || "[]");
    universities.push(data);
    localStorage.setItem("universities", JSON.stringify(universities));
}
function removeFromLocalStorage(name) {
    let universities = JSON.parse(localStorage.getItem("universities") || "[]");
    universities = universities.filter((u) => u.name !== name);
    localStorage.setItem("universities", JSON.stringify(universities));
}
function editRow(button) {
    var _a;
    const row = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    const cells = row.children;
    document.getElementById("Logo").value = cells[0].querySelector("img").src;
    document.getElementById("name").value = cells[1].textContent || "";
    document.getElementById("type").value = cells[2].textContent || "";
    document.getElementById("year").value = cells[3].textContent || "";
    document.getElementById("country").value = cells[4].textContent || "";
    document.getElementById("phone").value = cells[5].textContent || "";
    document.getElementById("email").value = cells[6].textContent || "";
    document.getElementById("website").value = cells[7].querySelector("a").href;
    document.getElementById("students").value = cells[8].textContent || "";
    const nameToDelete = cells[1].textContent || "";
    removeFromLocalStorage(nameToDelete);
    row.remove();
}
function deleteRow(button) {
    var _a;
    const row = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    const nameToDelete = row.children[1].textContent || "";
    removeFromLocalStorage(nameToDelete);
    row.remove();
}
function searchByName() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const universities = JSON.parse(localStorage.getItem("universities") || "[]");
    const filtered = universities.filter((u) => u.name.toLowerCase().includes(searchValue));
    const tableBody = document.getElementById("universityTableBody");
    tableBody.innerHTML = "";
    filtered.forEach((data) => addRowToTable(data));
}
function resetSearch() {
    document.getElementById("searchInput").value = "";
    searchByName();
}
function exportCSV() {
    const data = JSON.parse(localStorage.getItem("universities") || "[]");
    if (data.length === 0) {
        alert("No data to export.");
        return;
    }
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")];
    for (const row of data) {
        const values = headers.map((header) => { var _a; return `"${((_a = row[header]) === null || _a === void 0 ? void 0 : _a.toString().replace(/"/g, '""')) || ""}"`; });
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
function importCSV(event) {
    var _a;
    const input = event.target;
    const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
    if (!file)
        return;
    const reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        const content = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        const lines = content.trim().split("\n");
        const headers = lines[0].split(",");
        const universities = lines.slice(1).map((line) => {
            const values = line.split(",").map((v) => v.replace(/^"|"$/g, "").replace(/""/g, '"'));
            const entry = {};
            headers.forEach((header, i) => {
                var _a;
                entry[header.trim()] = ((_a = values[i]) === null || _a === void 0 ? void 0 : _a.trim()) || "";
            });
            return entry;
        });
        universities.forEach((data) => addRowToTable(data));
        localStorage.setItem("universities", JSON.stringify(universities));
        alert("CSV data imported successfully!");
    };
    reader.readAsText(file);
}
function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "index.html";
}
function filterByType() {
    var _a;
    const filter = document.getElementById("typeFilter").value.toLowerCase();
    const table = document.querySelector("table");
    const rows = table.tBodies[0].rows;
    for (let row of Array.from(rows)) {
        const typeCell = ((_a = row.cells[2].textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
        row.style.display = filter === "" || typeCell === filter ? "" : "none";
    }
}
