function saveUser(e: Event): void {
  e.preventDefault();

  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passInput = document.getElementById("password") as HTMLInputElement;
  const confirmInput = document.getElementById("confirm") as HTMLInputElement;

  const email: string = emailInput.value;
  const pass: string = passInput.value;
  const confirm: string = confirmInput.value;

  if (pass !== confirm) {
    alert("Passwords do not match!");
    return;
  }


  type User = {
    email: string;
    password: string;
  };

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const userExists = users.some((user: User) => user.email === email);
  if (userExists) {
    alert("User with this email already exists!");
    return;
  }

  users.push({ email: email, password: pass });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Now login.");
  window.location.href = "HTML/login.html";
}
