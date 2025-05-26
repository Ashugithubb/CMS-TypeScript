"use strict";
function saveUser(e) {
    e.preventDefault();
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm");
    const email = emailInput.value;
    const pass = passInput.value;
    const confirm = confirmInput.value;
    if (pass !== confirm) {
        alert("Passwords do not match!");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
        alert("User with this email already exists!");
        return;
    }
    users.push({ email: email, password: pass });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Now login.");
    window.location.href = "login.html";
}
