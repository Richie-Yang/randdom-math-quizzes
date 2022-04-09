const submitButton = document.querySelector('#submit-button')
const answer = document.querySelector('#answer')
const question = document.querySelector('#question')
const score = document.querySelector('#score')
const time = document.querySelector('#time')
const outerBanner = document.querySelector('#outer-banner')
const bannerTitle = document.querySelector('#banner-title')
const bannerWords = document.querySelector('#banner-words')
let timeoutTimer

const intervalTimer = setInterval(() => {
  if (Number(time.innerHTML) > 0) time.innerHTML = time.innerHTML - 1
  if (Number(time.innerHTML) === 0) {
    bannerTitle.innerHTML = 'Timeout!'
    bannerWords.innerHTML = `Your score is ${score.innerHTML}, please refresh the page to restart.`
    submitButton.classList.add('disabled')
    bannerAction(false)
    clearInterval(intervalTimer)
    clearTimeout(timeoutTimer)
  }
}, 1000)

function bannerAction (nonPersistent = true) {
  outerBanner.style.top = '-110px'
  if (nonPersistent) {
    timeoutTimer = setTimeout(() => {
      if (outerBanner.style.top === '-110px') {
        outerBanner.style.top = '20px'
        submitButton.classList.remove('disabled')
      }
    }, 3000)
  }
}

submitButton.addEventListener('click', function onSubmitButtonClicked() {
  (async () => {
    const { userId } = submitButton.dataset
    submitButton.classList.add('disabled')
    const res = await axios.post(`/game/${userId}/submit`, { 
      question: question.innerText, answer: answer.value
    })

    switch (res.data.status) {
      case 'Correct':
        const domEdges = document.querySelectorAll('.dom-edge')
        domEdges.forEach(domEdge => {
          domEdge.classList.remove('d-none')
          domEdge.classList.add('slide-left')
          setTimeout(() => {
            domEdge.classList.add('d-none')
            domEdge.classList.remove('slide-left')
          }, 1000)
        })
        score.innerHTML = Number(score.innerHTML) + 10
        time.innerHTML = Number(time.innerHTML) + 30

      default:
        bannerTitle.innerHTML = res.data.status
        bannerWords.innerHTML = res.data.message
        break
    }
    question.innerHTML = res.data.question
    bannerAction()
  })()
})
