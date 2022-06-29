async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}
document.querySelector(".logout-btn-mobile").addEventListener("click", logout);
document.querySelector(".logout-btn").addEventListener("click", logout);
