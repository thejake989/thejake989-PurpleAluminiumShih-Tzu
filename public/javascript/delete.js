const parentEl = document.getElementById("dashboard-polls");

async function deletePollHandler(e) {
  if (e.target.classList.contains("delete-btn")) {
    const pollId = e.target.parentNode.parentNode.dataset.pollId;
    console.log(pollId);
    const response = await fetch(`/api/polls/${pollId}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    }
  }
}
if (parentEl) {
  parentEl.addEventListener("click", deletePollHandler);
}
