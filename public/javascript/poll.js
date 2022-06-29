async function createPoll(event) {
  event.preventDefault();

  const title = document.getElementById("pollTitle").value.trim();

  if (!title) {
    const error = document.getElementById("error");
    error.innerText = "Please provide a title";
    error.style.opacity = 1;
    setTimeout(() => {
      error.style.opacity = 0;
    }, 2500);
    return;
  }
  const response = await fetch("/api/polls/", {
    method: "post",
    body: JSON.stringify({
      title,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.getElementById("create-poll").addEventListener("submit", createPoll);
