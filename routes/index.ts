const router = require('express').Router()
const mathHelpers = require('../helpers/math-helpers')

router.get('/', (req: any, res: any) => {
  const question = mathHelpers.generateQuestion()
  res.render('index', { question })
})

router.post('/submit', (req: any, res: any) => {
  const { question, answer } = req.body
  const response = { 
    status: 'error',
    message: 'none',
    question: mathHelpers.generateQuestion() 
  }
  
  if (isNaN(Number(answer)) || answer === '') {
    response.message = 'Please input number format'
    return res.send(response)
  } 

  if (!question?.trim()) {
    response.message = 'Something went wrong'
    return res.send(response)
  }

  const calculatedAnswer: number = mathHelpers.calculateAnswer(question)
  const CorrectOrWrong: string = calculatedAnswer === Number(answer)
    ? 'correct'
    : 'incorrect'
  
  response.status = CorrectOrWrong
  response.message = `Correct answer is ${calculatedAnswer}\nYour Answer is ${CorrectOrWrong}`
  res.send(response)
})

module.exports = router