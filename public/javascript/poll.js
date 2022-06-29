async function createPoll(event) {
  event.preventDefault();

  const parentEl = document.getElementById("poll-parent");
  const title = document.getElementById("pollTitle").value.trim();
  const nextStepBtn = document.getElementById("next-step-btn");

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
  const data = await response.json();
  nextStepBtn.setAttribute("disabled", "");
  nextStepBtn.className =
    "bg-gray-300 cursor-not-allowed text-white font-bold p-3 rounded mt-4";
  if (response.ok) {
    parentEl.dataset.pollId = data.id;
    // document.location.replace("/dashboard");
    console.log(data);
  } else {
    alert(response.statusText);
  }
}

document.getElementById("create-poll").addEventListener("submit", createPoll);
