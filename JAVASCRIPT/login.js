"use strict";
function loginUser(e) {
    e.preventDefault();
    // Type assertion to make sure we get input elements
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");
    const email = emailInput.value;
    const pass = passInput.value;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const validUser = users.find(user => user.email === email && user.password === pass);
    if (validUser) {
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    }
    else {
        alert("Invalid credentials!");
    }
}
