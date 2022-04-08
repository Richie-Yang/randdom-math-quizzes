const gameLocal = {
  router: require('express').Router(),
  base64: require('base-64'),
  mathHelpers: require('../../helpers/math-helpers'),
  User: require('../../models/user'),
  token: ''
}

gameLocal.router.get('/:userId', async (req: any, res: any) => {
  try {
    const { mathHelpers, User, base64 } = gameLocal
    let { token } = gameLocal
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) throw new Error('User is not found, please use a name to start the game!')
    if (user.isPlayed) throw new Error('Your play quota has reached to the limit!')

    const question = mathHelpers.generateQuestion()
    token = base64.encode(question)
    return res.render('index', { name: user.name, question, game: true })

  } catch (err) {
    console.error(err)
    res.redirect('/')
  }
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