const homeLocal = {
  router: require('express').Router(),
  User: require('../../models/user')
}

homeLocal.router.get('/', (req: any, res: any) => {
  return res.render('index')
})

homeLocal.router.post('/start', async (req: any, res: any, next: any) => {
  try {
    const { name } = req.body
    const { User } = homeLocal

    if (!name.trim()) throw new Error(
      'Please do not leave blank for name input!'
    )

    let user = await User.findOne({ name })
    if (user) throw new Error(
      'Input name is duplicated, please use another one!'
    )

    user = await User.create({ name })
    return res.redirect(`/game/${user.id}`)
  } catch (err) { next(err) }
})

module.exports = homeLocal.router
