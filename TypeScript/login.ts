function loginUser(e: Event): void {
  e.preventDefault();

  
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passInput = document.getElementById("password") as HTMLInputElement;

  const email: string = emailInput.value;
  const pass: string = passInput.value;

  
  type User = {
    email: string;
    password: string;
  };

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const validUser = users.find(user => user.email === email && user.password === pass);

  if (validUser) {
    alert("Login Successful!");
    window.location.href = "/HTML/dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
}
