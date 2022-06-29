async function closePollHandler(event) {
  event.preventDefault();

  const pollIdValue = document.getElementById("close-poll-btn").dataset.poll_id;

  const response = await fetch("/api/polls/" + pollIdValue, {
    method: "put",
    body: JSON.stringify({
      is_open: false,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("Your poll is now closed");
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#close-poll-btn")
  .addEventListener("click", closePollHandler);
