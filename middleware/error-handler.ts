module.exports = {
  generalErrorHandler: (err: any, req: any, res: any, next: any) => {
    if (err instanceof Error) {
      const { name, message } = err
      req.flash('error_messages', `${name}: ${message}`)
    } else {
      req.flash('error_messages', `error: ${err}`)
    }
    res.redirect('back')
  }
}
