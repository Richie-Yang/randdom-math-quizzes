const router = require('express').Router()
const base64 = require('base-64')
const mathHelpers = require('../helpers/math-helpers')
const User = require('../models/user')
let token: string = ''

router.get('/', (req: any, res: any) => {
  return res.render('index')
})

router.post('/start', async (req: any, res: any) => {
  try {
    const { name } = req.body
    if (!name.trim()) throw new Error('Please do not leave blank for name input!')

    const user = await User.findOne({ name })
    if (user) throw new Error('Input name is duplicated, please use another one!')

    await User.create({ name })
    return res.redirect('/game')

  } catch (err) { 
    console.error(err)
    res.redirect('/') 
  }
})

router.get('/game/:userId', async (req: any, res: any) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) throw new Error('')

    const question = mathHelpers.generateQuestion()
    token = base64.encode(question)
    return res.render('index', { question, game: true })

  } catch (err) {
    console.error(err)
    res.redirect('/')
  }
})

router.post('/game/submit', (req: any, res: any) => {
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