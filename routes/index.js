var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var JobOffer = require('../models/job')
var Subscriber = require('../models/subscriber')
/* GET home page. */
router.get('/', function(req, res, next) {
  JobOffer.find({}, (err, offers) => {
    if (err) {
      res.render('error', err)
      return
    }
    res.render('job-listings', {jobs: offers, partials: {'job-card': 'job-card'}})
  })
});
router.get('/new', (req, res) => {
  res.render('new-job')
})
router.get('/jobs/:id', (req, res) => {
  JobOffer.findById(req.params.id, (err, offer) => {
    if (err) {
      res.render('error', err)
      return
    }
    res.render('view-job', offer)
  })
  
})
router.post('/new', upload.single('company_logo'), (req, res) => {
  var offer = {}
  offer = req.body
  offer.min_salary = +offer.min_salary
  offer.max_salary = +offer.max_salary
  offer.responsabilities = offer.responsabilities.split('\r\n')
  offer.benefits = offer.benefits.split('\r\n')
  offer.profile = offer.profile.split('\r\n')
  offer.company_logo = req.file.path
  var jobOffer = new JobOffer(offer)
  jobOffer.save().then((offer) => {
    res.redirect('/jobs/' + offer.id)
  }).catch((err) => {
    console.log(err)
  })
})
router.post('/subscribe', (req, res) => {
  var subscriber = new Subscriber(req.body)
  subscriber.save().then((offer) => {
    res.render('subscription-success')
  }).catch((err) => {
    console.log(err)
  })

})
module.exports = router;
