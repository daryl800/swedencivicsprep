const app = document.querySelector("#app");

let state = {
  route: getRoute(),
  questionIndexByTopic: {},
  selectedIndex: null,
  checked: false,
  lastWasCorrect: false,
  progress: loadProgress()
};

window.addEventListener("hashchange", () => {
  state.route = getRoute();
  state.selectedIndex = null;
  state.checked = false;
  render();
});

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [page, topicId] = hash.split("/");
  return { page: page || "home", topicId };
}

function getQuestionsForTopic(topicId) {
  return QUESTIONS.filter((question) => question.topicId === topicId);
}

function getCurrentQuestion(topicId) {
  const questions = getQuestionsForTopic(topicId);
  const index = state.questionIndexByTopic[topicId] || 0;
  return { question: questions[index], questions, index };
}

function setRouteHome() {
  window.location.hash = "/";
}

function setRouteTopic(topicId) {
  window.location.hash = `/topic/${topicId}`;
}

function selectAnswer(index) {
  if (state.checked) return;
  state.selectedIndex = index;
  render();
}

function checkAnswer(topicId) {
  const { question } = getCurrentQuestion(topicId);
  if (!question || state.selectedIndex === null) return;

  state.checked = true;
  state.lastWasCorrect = state.selectedIndex === question.correctIndex;
  state.progress = recordAnswered(question.id);
  render();
}

function nextQuestion(topicId) {
  const questions = getQuestionsForTopic(topicId);
  const current = state.questionIndexByTopic[topicId] || 0;
  state.questionIndexByTopic[topicId] = (current + 1) % questions.length;
  state.selectedIndex = null;
  state.checked = false;
  render();
}

function handleResetProgress() {
  state.progress = resetProgress();
  render();
}

function render() {
  state.progress = loadProgress();

  if (state.route.page === "topic" && state.route.topicId) {
    const topic = TOPICS.find((item) => item.id === state.route.topicId);
    if (topic) {
      renderTopic(topic);
      return;
    }
  }

  renderHome();
}

function renderHome() {
  app.innerHTML = `
    <main class="shell">
      <section class="intro">
        <p class="eyebrow">Citizenship test preparation</p>
        <h1>Swedish Civics Practice</h1>
        <p class="lead">Practice questions about Swedish society to prepare for the citizenship test.</p>
        ${renderProgress()}
      </section>

      <section class="topic-list" aria-label="Topics">
        ${TOPICS.map((topic) => {
          const count = getQuestionsForTopic(topic.id).length;
          return `
            <article class="topic-card">
              <div>
                <p class="topic-sv">${topic.nameSv}</p>
                <h2>${topic.nameEn}</h2>
                <p>${topic.descriptionEn}</p>
              </div>
              <button class="primary" type="button" data-topic="${topic.id}">
                Practice ${count} questions
              </button>
            </article>
          `;
        }).join("")}
      </section>
    </main>
  `;

  document.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => setRouteTopic(button.dataset.topic));
  });
}

function renderTopic(topic) {
  const { question, questions, index } = getCurrentQuestion(topic.id);
  const selected = state.selectedIndex;
  const correct = question.correctIndex;

  app.innerHTML = `
    <main class="shell">
      <nav class="topbar">
        <button class="ghost" type="button" data-home>Back to topics</button>
        ${renderProgress()}
      </nav>

      <section class="practice">
        <div class="practice-header">
          <div>
            <p class="topic-sv">${topic.nameSv}</p>
            <h1>${topic.nameEn}</h1>
          </div>
          <p class="question-count">Question ${index + 1} of ${questions.length}</p>
        </div>

        <form class="question-form">
          <fieldset>
            <legend>${question.questionSv}</legend>
            <div class="options">
              ${question.options.map((option, optionIndex) => {
                const isSelected = selected === optionIndex;
                const isCorrect = state.checked && optionIndex === correct;
                const isWrong = state.checked && isSelected && optionIndex !== correct;
                const statusClass = isCorrect ? "correct" : isWrong ? "wrong" : "";

                return `
                  <label class="option ${isSelected ? "selected" : ""} ${statusClass}">
                    <input type="radio" name="answer" value="${optionIndex}" ${isSelected ? "checked" : ""} ${state.checked ? "disabled" : ""}>
                    <span>${option}</span>
                  </label>
                `;
              }).join("")}
            </div>
          </fieldset>
        </form>

        ${state.checked ? renderResult(question) : ""}

        <div class="actions">
          <button class="primary" type="button" data-check ${selected === null || state.checked ? "disabled" : ""}>Check</button>
          <button class="secondary" type="button" data-next ${state.checked ? "" : "disabled"}>Next question</button>
          <button class="ghost" type="button" data-reset>Reset progress</button>
        </div>
      </section>
    </main>
  `;

  document.querySelector("[data-home]").addEventListener("click", setRouteHome);
  document.querySelector("[data-check]").addEventListener("click", () => checkAnswer(topic.id));
  document.querySelector("[data-next]").addEventListener("click", () => nextQuestion(topic.id));
  document.querySelector("[data-reset]").addEventListener("click", handleResetProgress);
  document.querySelectorAll("input[name='answer']").forEach((input) => {
    input.addEventListener("change", () => selectAnswer(Number(input.value)));
  });
}

function renderProgress() {
  return `
    <div class="progress" aria-label="Practice progress">
      <strong>${state.progress.today}</strong> answered today
      <span aria-hidden="true">/</span>
      <strong>${state.progress.total}</strong> total
    </div>
  `;
}

function renderResult(question) {
  const correctText = question.options[question.correctIndex];
  return `
    <section class="result ${state.lastWasCorrect ? "result-correct" : "result-wrong"}" aria-live="polite">
      <h2>${state.lastWasCorrect ? "Correct" : "Not quite"}</h2>
      <p><strong>Correct answer:</strong> ${correctText}</p>
      <p>${question.explanationEn}</p>
      <p class="placeholder"><strong>Chinese:</strong> ${question.explanationZh || "Placeholder translation will be added later."}</p>
    </section>
  `;
}

render();
