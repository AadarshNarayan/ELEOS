var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')
const checkAuth = require('../middleware/checkAuth');
const path = require('path');
const nodemailer = require('nodemailer');
router.use(checkAuth);
const { Pool } = require('pg');
const pool = require('../db');



/* GET home page. */
router.get('/', function (req, res, next) {


  res.render('userhome', { admin: false });
});
router.get('/login', (req, res) => {
  res.render('user/login')
})
router.get('/signup', (req, res) => {
  res.render('user/signup')
})
router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log('response');
    res.redirect('/login')
  })
})
router.post('/login', (req, res) => {
  userHelpers.doLogin(rq.body).then((response) => {
    if (response.status) {
      req.session.loggedIN = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  })
})
router.get('/logout', (req, res) => {
  req.session.destroy()
  req.redirect('/')
})

router.get('/serviceprovider', (req, res) => {
  res.render('user/serviceprovider')
})
router.get('/select', (req, res) => {
  res.render('user/select')
})
router.get('/service/transportation', (req, res) => {
  res.render('./user/transportation')
})
router.get('/service/health', (req, res) => {
  res.render('./user/health')
})
router.get('/service/finance', (req, res) => {
  res.render('./user/finance')
})
router.get('/service/education', (req, res) => {
  res.render('./user/education')
})
router.get('/service/government', (req, res) => {
  res.render('./user/government')
})
router.get('/service/housing', (req, res) => {
  res.render('./user/housing')
})
router.get('/about', (req, res) => {
  res.render('./head/about')
})

router.get('/learn_more', (req, res) => {
  res.render('./head/learn_more')
})

router.get('/contact', (req, res) => {
  res.render('./head/contact');
})
router.get('/timings', (req, res) => {
  res.render('user/timings')
})
router.get('/flight', (req, res) => {
  res.redirect('https://www.goibibo.com/flights/')
})
router.get('/theservice', (req, res) => {
  res.render('./head/theservice')
})


router.get('/team_members', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/teammembers.html'));
});


router.get('/service/transportation/Nearby_Transit_Stations', (req, res) => {
  res.render('Nearby_Transit_Stations')
})

router.get('/service/transportation/health_emergency_services', (req, res) => {
  res.render('health_emergency_services')
})

router.get('/service/transportation/vehicleservicecenters', (req, res) => {
  res.render('vehicleservicecenters')
})
router.get('/service/transportation/OLAandUBER', (req, res) => {
  res.render('OLAandUBER')
})


router.get('/service/transportation/transportation_travel_booking', (req, res) => {
  res.render('transportation_travel_booking')
})

router.get('/service/transportation/transportation_olx', (req, res) => {
  res.render('transportation_olx')
})

router.get('/service/health/health_nearby_health_centers', (req, res) => {
  res.render('health_nearby_health_centers')
})

router.get('/service/health/health_emergency_services', (req, res) => {
  res.render('health_emergency_services')
})

router.get('/service/health/Health_nearby_pharmacy', (req, res) => {
  res.render('Health_nearby_pharmacy')
})

router.get('/service/health/health_eldercare_and_nurse_service', (req, res) => {
  res.render('health_eldercare_and_nurse_service')
})

router.get('/service/education/education_nearby_education_institutions', (req, res) => {
  res.render('education_nearby_education_institutions')
})

router.get('/service/education/education_industrial_and_job_aid', (req, res) => {
  res.render('education_industrial_and_job_aid')
})

router.get('/service/education/education_arts_sports_and_cultural', (req, res) => {
  res.render('education_arts_sports_and_cultural')
})

router.get('/service/education/education_educational_materials', (req, res) => {
  res.render('education_educational_materials')
})

router.get('/service/finance/finance_tax_and_insurance', (req, res) => {
  res.render('finance_tax_and_insurance')
})

router.get('/service/finance/finance_loan_details', (req, res) => {
  res.render('finance_loan_details')
})

router.get('/service/finance/finance_nearby_bank', (req, res) => {
  res.render('finance_nearby_bank')
})

router.get('/service/government/government_government_schemes', (req, res) => {
  res.render('government_government_schemes')
})

router.get('/service/government/government_customer_queries', (req, res) => {
  res.render('government_customer_queries')
})

router.get('/service/housing/housing_food_and_water_supply', (req, res) => {
  res.render('housing_food_and_water_supply')
})

router.get('/service/housing/housing_house_service', (req, res) => {
  res.render('housing_house_service')
})

router.get('/service/housing/housing_house_rent_and_purchase', (req, res) => {
  res.render('housing_house_rent_and_purchase')
})

router.get('/service', function (req, res, next) {

  res.render('userservice', { admin: false });
});

router.get('/service/health/bookappointments', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin/doctorslist.html'));

});
router.get('/service/health/bookappointments/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM doctors');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.get('/redirect', (req, res) => {
  const content = req.query.content;
  const externalLink = `https://www.google.com/maps/search/Transit+stations+near+${encodeURIComponent(content)}`;
  res.redirect(externalLink);
});

router.get('/service/transportation/vehiclecenters', (req, res) => {
  const content = req.query.content;
  const externalLink = `https://www.google.com/maps/search/vehicle+service+center+near+${encodeURIComponent(content)}`;
  res.redirect(externalLink);
});

router.get('/service/health/emergencyservice', (req, res) => {
  const content = req.query.content;
  const externalLink = `https://www.google.com/maps/search/emergency+services+near+${encodeURIComponent(content)}`;
  res.redirect(externalLink);
});


router.get('/service/transportation/Nearby_Transit', (req, res) => {
  const content = req.query.content;
  const externalLink = `https://www.google.com/maps/search/Transit+stations+near+${encodeURIComponent(content)}`;
  res.redirect(externalLink);
});


router.get('/service/health/Nearby_Health', (req, res) => {
  const content = req.query.content;
  const externalLink = `https://www.google.com/maps/search/hospitals+near+${encodeURIComponent(content)}`;
  res.redirect(externalLink);
});

router.get('/service/health/Nearby_Pharmacy', (req, res) => {
  const content = req.query.content;
  const externalLink = `https://www.google.com/maps/search/Pharmacies+near+${encodeURIComponent(content)}`;
  res.redirect(externalLink);
});

router.get('/service/finance/Nearby_bank', (req, res) => {
  const content = req.query.content;
  const externalLink = `https://www.google.com/maps/search/banks+near+${encodeURIComponent(content)}`;
  res.redirect(externalLink);
});



router.get('/service/education/Nearby_education_institutions', (req, res) => {
  const content = req.query.content;
  const externalLink = `https://www.google.com/maps/search/educational+institutions+near+${encodeURIComponent(content)}`;
  res.redirect(externalLink);
});

router.get('/service/housing/House_service', (req, res) => {
  const content = req.query.content;
  const externalLink = `https://www.google.com/maps/search/housing+services+near+${encodeURIComponent(content)}`;
  res.redirect(externalLink);
});



router.get('/send-details', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/sendmail.html')); // Adjust the path as necessary
});

router.post('/send-details', checkAuth, async (req, res) => {
  const { name, profession, service, location, email, contact } = req.body;

  // Configure the email transport using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'our emailid',
      pass: "our password"
    }
  });

  // Email options
  const mailOptions = {
    from: 'our emailid',
    to: 'emailid to which mail to be received',
    subject: 'User Details Submission',
    text: `Name: ${name}\nProfession: ${profession}\nService: ${service}\nLocation: ${location}\nEmail: ${email}\nContact Number:${contact}`
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.redirect('/user');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending details.' });
  }
});
module.exports = router;
