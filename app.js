var express = require('express')
var app = express()
var hogan = require('hogan-express')
var request = require('request')
var _ = require('lodash')
app.engine('html', hogan)
app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(__dirname + '/public/'))
var config = require('./config')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', function(req, res) {
  var query = '{ objects(bucket_slug: "' + config.COSMIC_BUCKET + '", read_key: "' + config.COSMIC_READ_KEY + '"){ slug, title, content, metadata, type_slug } }'
  var url = 'https://graphql.cosmicjs.com/v1'
  var data = {
    query: query
  }
  var options = {
    method: 'post',
    body: data,
    json: true,
    url: url
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var cosmic = body.data
      cosmic.projects = _.filter(cosmic.objects, { type_slug: 'projects' })
      var sections = _.filter(cosmic.objects, { type_slug: 'sections' })
      cosmic.about = _.find(sections, { slug: 'about' })
      cosmic.social = _.find(sections, { slug: 'social' })
      res.locals.cosmic = cosmic
      res.render('index.html')
    }
  })
})
app.post('/', function(req, res) {
  if (!config.MAILGUN_KEY || !config.MAILGUN_DOMAIN)
    return res.end('You must add a MailGun api key and domain to your configuration.  You can either add these to your config.js file, or as environment variables.');
  if (!config.TO_EMAIL)
    return res.end('You must add a "to" email to your configuration.  You can either add this to your config.js file, or as an environment variable.');
  var mailgun = require('mailgun-js')({ apiKey: config.MAILGUN_KEY, domain: config.MAILGUN_DOMAIN })
  var message = 'Name: ' + req.body.name + '\n\n' +
  'Subject: New Message on your Website\n\n' +
  'Message: ' + req.body.message + '\n\n'
  var data = {
    from: req.body.email,
    to: config.TO_EMAIL,
    subject: req.body.name + ' sent you a new message',
    text: message
  }
  mailgun.messages().send(data, function (error, body) {
    res.end('Success!  Message sent.') // Do some sort of redirect here with a success message
  })
})
app.listen(app.get('port'))