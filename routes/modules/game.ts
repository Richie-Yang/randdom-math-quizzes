const gameLocal = {
  router: require('express').Router(),
  base64: require('base-64'),
  mathHelpers: require('../../helpers/math-helpers'),
  User: require('../../models/user'),
  token: ''
}

gameLocal.router.get('/', async (req: any, res: any) => {
  const { mathHelpers, base64 } = gameLocal
  let { token } = gameLocal

  const question = mathHelpers.generateQuestion()
  token = base64.encode(question)
  return res.render('index', { question, game: true })
})

gameLocal.router.post('/submit', (req: any, res: any) => {
  const { mathHelpers, base64 } = gameLocal
  let { token } = gameLocal
  let { question, answer } = req.body
  const nextQuestion = mathHelpers.generateQuestion()
  const response = {
    status: 'Error!',
    message: 'none',
    question: nextQuestion
  }

  if (base64.encode(question) !== token) {
    response.message = 'Something went wrong'
    return res.send(response)
  }
  token = base64.encode(nextQuestion)

  if (isNaN(Number(answer)) || answer === '') {
    response.message = 'Please input number format'
    return res.send(response)
  }
  answer = Number(answer)

  const calculatedAnswer: number = mathHelpers.calculateAnswer(question)
  const CorrectOrWrong: string = mathHelpers.calculateResult(
    answer, calculatedAnswer
  )

  response.status = CorrectOrWrong
  response.message = `Correct answer is ${calculatedAnswer}, Your Answer is ${CorrectOrWrong}`
  return res.send(response)
})

module.exports = gameLocal.router
