const authLocal = {
  User: require('../models/user')
}

module.exports = {
  authenticated: async (req: any, res: any, next: any) => {
    try {
      const { User } = authLocal
      const { userId } = req.params

      const user = await User.findById(userId)
      if (!user) throw new Error('User is not found, please use a name to start the game!')
      if (user.isPlayed) throw new Error('Your play quota has reached to the limit!')
      return next()

    } catch (err) { 

      req.flash('warning_messages', err)
      return res.redirect('/')
    }
  }
}
