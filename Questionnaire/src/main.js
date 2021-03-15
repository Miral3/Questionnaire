/* JSON에서 데이터를 받아옴 */
function loadItems() {
  return fetch('data/question.json')
    .then(response => response.json())
    .then(json => json.items);
}

/* 받아온 데이터를 보여줌 */
function displayItems(items, idx, score) {
  const container = document.querySelector('.questionWindow');
  container.innerHTML = createHTMLString(items[idx]);
  setEventListeners(items, idx, score);
}

/* 결과창을 보여줌 */
function displayResult(items, idx, score) {
  const container = document.querySelector('.questionWindow');
  container.innerHTML = createResult(score);
}

/* 결과창을 HTML형태로 생성 */
function createResult(score) {
  return `
  <span class="result">당신은 ${score}문제 맞췄습니다!</span>
  <button class="reset" onclick="location.reload()">reset</button>
 `
}

/* 받아온 데이터를 HTML형태로 변환 */
function createHTMLString(item) {
  return `
  <span class="question">${item.question}</span>
    <ul class="buttons">
      <li class="btn">
        <input type="radio" id="a" name="answer">
        <label for="a">
          ${item.a}
        </label>
      </li>
      <li class="btn">
        <input type="radio" id="b" name="answer">
        <label for="b">
          ${item.b}
        </label>
      </li>
      <li class="btn">
        <input type="radio" id="c" name="answer">
        <label for="c">
          ${item.c}
        </label>
      </li>
      <li class="btn">
        <input type="radio" id="d" name="answer">
        <label for="d">
          ${item.d}
        </label>
      </li>
    </ul>
    <button class="submit">Submit</button>
    `;
}

/* submit버튼을 클릭하면 실행되는 함수 */
function onButtonClick(items, idx, score) {
  const ansNodeList = document.getElementsByName('answer');
  const correct = items[idx].correct;
  const size = Object.keys(items).length;

  ansNodeList.forEach((node) => {
    if (node.checked) {
      if (correct === node.id) {
        score++;
      }
    }
  })

  idx++;
  if (idx < size) {
    displayItems(items, idx, score);
  }
  else {
    displayResult(items, idx, score);
  }
}

/* submit 버튼에 함수 적용 */
function setEventListeners(items, idx, score) {
  const submit = document.querySelector('.submit');
  const reset = document.querySelector('.reset');
  submit.addEventListener('click', () => onButtonClick(items, idx, score));
}

/* main 함수 */
function init() {
  let idx = 0;
  let score = 0;

  loadItems()
    .then(items => {
      displayItems(items, idx, score);
    })
    .catch(console.log);
}

init();
