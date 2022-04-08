const router = require('express').Router()
const base64 = require('base-64')
const mathHelpers = require('../helpers/math-helpers')
let token: string = ''

router.get('/', (req: any, res: any) => {
  const question = mathHelpers.generateQuestion()
  token = base64.encode(question)
  res.render('index', { question })
})

router.post('/submit', (req: any, res: any) => {
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

module.exports = router