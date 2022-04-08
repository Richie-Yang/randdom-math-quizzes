module.exports = {
  decideNumberCount: (): number => {
    const DEFAULT_NUMBER = 10
    const number: number = Math.floor(Math.random() * DEFAULT_NUMBER)
    return number
  },

  createRandomNumber: (min: number = 1, max: number = 1000): number => {
    if (min > max) throw new Error('最小數字必須小於最大數字')

    const randomNumber: number = Math.floor(
      Math.random() * (max - min + 1) + min
    )
    return randomNumber
  },

  pickRandomMathOp: (): string => {
    const defaultMathOpArray: string[] = ['+', '-', '*', '/']

    const randomMathOp: string = defaultMathOpArray[Math.floor(Math.random() * defaultMathOpArray.length)]
    return randomMathOp
  },

  generateQuestion: function (numberCount: number = 3): string {
    let question: string = ``
    for (let x = 1; x < (numberCount * 2); x++) {
      if (x % 2 === 0) {
        question += ` ${this.pickRandomMathOp()} `
        continue
      } else question += this.createRandomNumber()
    }
    return question
  },

  calculateAnswer: (question: string) => {
    let answer: number = 0
    console.log(question)
    const questionArray: string[] = question.split(' ')

    for (let x = 0; x < questionArray.length; x++) {
      let tempNum: number = 0
      if (questionArray[x] === '*') {
        tempNum += (
          Number(questionArray[x - 1]) * Number(questionArray[x + 1])
        )
        questionArray.splice(x - 1, 3, `${tempNum}`)
        x -= 1
      }

      if (questionArray[x] === '/') {
        tempNum += (
          Number(questionArray[x - 1]) / Number(questionArray[x + 1])
        )
        questionArray.splice(x - 1, 3, `${tempNum}`)
        x -= 1
      }
    }

    for (let y = 0; y < questionArray.length; y++) {
      if (y === 0) answer = Number(questionArray[y])
      if (y % 2 === 0 && questionArray[y - 1] === '+') {
        answer += Number(questionArray[y])
      }
      if (y % 2 === 0 && questionArray[y - 1] === '-') {
        answer -= Number(questionArray[y])
      }
    }

    answer = Math.round(answer * 100) / 100
    // return {process: questionArray, result: answer}
    return answer
  },

  calculateResult: (incomingAnswer: number, answer: number): string => {
    return incomingAnswer === answer ? 'Correct' : 'Incorrect'
  }
}