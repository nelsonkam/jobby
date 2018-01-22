var mongoose = require('./mongoose')

const JobOfferSchema = new mongoose.Schema({
  position: String,
  description: String,
  profile: [String],
  responsabilities: [String],
  benefits: [String],
  location: String,
  min_salary: Number,
  max_salary: Number,
  recruter_name: String,
  recruter_email: String,
  company_name: String,
  company_description: String,
  company_logo: String,
  submission_email: String,
});

module.exports = mongoose.model('JobOffer', JobOfferSchema)