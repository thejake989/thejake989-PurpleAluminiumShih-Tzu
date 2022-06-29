async function voteSubmitHandler(event) {
  event.preventDefault();

  const ulEl = document.getElementById("choice-list");
  let liEl = document.getElementById("choice-list").getElementsByTagName("li");
  const liArray = [];

  // for each li element, get the choice name (from title) and rank value (from options value) and put into array
  for (let i = 0; i < liEl.length; i++) {
    const el = liEl[i];
    const choiceValue = el.getElementsByTagName("select");

    liArray.push({
      choice_name: el.dataset.choice,
      // choice id
      id: el.dataset.choice_id,
      poll_id: ulEl.dataset.poll_id,
      rank_value: choiceValue[0].value,
    });
  }

  console.log(liArray);
}

document
  .querySelector("#vote-form")
  .addEventListener("submit", voteSubmitHandler);
