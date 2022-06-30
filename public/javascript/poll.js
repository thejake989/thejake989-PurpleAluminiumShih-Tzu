const parentEl = document.getElementById("poll-parent");
const nextStepBtn = document.getElementById("next-step-btn");
const choicesForm = document.getElementById("choices");
const finishBtn = document.getElementById("finish-btn");
const choicesList = document.getElementById("choiceList");

const choicesArr = [];

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
  const data = await response.json();
  document.getElementById("pollTitle").setAttribute("readonly", "");
  nextStepBtn.setAttribute("disabled", "");
  nextStepBtn.className =
    "bg-gray-300 cursor-not-allowed text-white font-bold p-3 rounded mt-4";
  choicesForm.style.display = "block";
  if (response.ok) {
    parentEl.dataset.pollId = data.id;
  } else {
    alert(response.statusText);
  }
}

async function addChoiceHandler(event) {
  event.preventDefault();
  const choiceName = document.getElementById("choice-name");
  const choiceText = choiceName.value.trim();
  choicesArr.push(choiceText);
  choiceName.value = "";
  const choiceLi = document.createElement("li");
  choiceLi.className = "p-2 rounded bg-green-500 text-white";
  choiceLi.innerText = choiceText;
  choicesList.append(choiceLi);

  // Show finish button if at least three choices added
  if (choicesArr.length >= 3) {
    finishBtn.style.display = "block";
  }
}

async function postChoices() {
  choicesArr.forEach((choice) => {
    const response = fetch("/api/choices", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        choice_name: choice,
        poll_id: parentEl.dataset.pollId,
      }),
    });
  });
  document.location.replace("/dashboard");
}

document.getElementById("create-poll").addEventListener("submit", createPoll);
choicesForm.addEventListener("submit", addChoiceHandler);
finishBtn.addEventListener("click", postChoices);
