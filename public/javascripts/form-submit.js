const submitButton = document.querySelector('#submit-button')
const question = document.querySelector('#question')
const score = document.querySelector('#score')
const time = document.querySelector('#time')

setInterval(() => {
  if (time.innerHTML > 0) time.innerHTML = time.innerHTML - 1
}, 1000)

submitButton.addEventListener('click', function onSubmitButtonClicked() {
  const answer = document.querySelector('#answer').value;
  (async () => {
    const res = await axios.post('/submit', { 
      question: question.innerText, answer 
    })

    switch (res.data.status) {
      case 'incorrect': 
        console.log('error')
        break
      case 'correct':
        score.innerHTML = Number(score.innerHTML) + 10
        time.innerHTML = Number(time.innerHTML) + 30
        break
      default: break
    }
    question.innerHTML = res.data.question
  })()
})