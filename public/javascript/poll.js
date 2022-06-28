async function createPoll(event) {
  event.preventDefault();

  const title = document.querySelector("#title-poll").value.trim();

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

document.querySelector(".poll-form").addEventListener("submit", createPoll);
