if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const userSeederLocal = {
  db: require('../../config/mongoose'),
  User: require('../user'),
  DEFAULT_SEED_USERNAME: 'test'
}

userSeederLocal.db.once('open', async () => {
  try {
    const { User, DEFAULT_SEED_USERNAME } = userSeederLocal

    const user = await User.findOne({ name: DEFAULT_SEED_USERNAME })
    if (user) await user.remove()
    
    await userSeederLocal.User.create({ name: 'test' })
    console.info('seed file completed!')
  } catch (err) {
    console.error(err)
  } finally {
    process.exit()
  }
})
