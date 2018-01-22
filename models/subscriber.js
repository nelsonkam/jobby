var mongoose = require('./mongoose')

const SubscriberSchema = new mongoose.Schema({
  name: String,
  email: String,
})
module.exports = mongoose.model('Subscriber', SubscriberSchema)