function loginUser(e: Event): void {
  e.preventDefault();

  // Type assertion to make sure we get input elements
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passInput = document.getElementById("password") as HTMLInputElement;

  const email: string = emailInput.value;
  const pass: string = passInput.value;

  // Define a type for User
  type User = {
    email: string;
    password: string;
  };

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const validUser = users.find(user => user.email === email && user.password === pass);

  if (validUser) {
    alert("Login Successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
}
