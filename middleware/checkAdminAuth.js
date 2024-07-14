function checkAdminAuth(req, res, next)  {
    if (req.session && req.session.adminLoggedIn) { 
      next();
    } else {
      res.status(403).send('Unauthorized');
    }
  }

  module.exports = checkAdminAuth;
