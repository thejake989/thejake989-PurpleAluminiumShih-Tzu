const canvas = document.getElementById("chart").getContext("2d");
const choiceNames = document.querySelectorAll("li[data-choice-name]");

const voteDataLabel = [];
const voteDataVotes = [];

for (let i = 0; i < choiceNames.length; i++) {
  let liEl = choiceNames[i];
  voteDataLabel.push(liEl.dataset.choiceName);
  voteDataVotes.push(parseInt(liEl.dataset.choiceRank));
}

let resultsChart = new Chart(canvas, {
  type: "doughnut",
  data: {
    labels: voteDataLabel,
    datasets: [
      {
        label: "Votes",
        data: voteDataVotes,
        backgroundColor: [
          "#8bbb7f",
          "#6faca9",
          "#549dd3",
          "#a9b6ad",
          "#ffcf87",
          "#49b6eb",
          "#3a6dff",
          "#67379d",
          "#93003a",
        ],
      },
    ],
  },
});
