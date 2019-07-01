module.exports = (req, res) => {
  if (req.session.user && req.cookies.authCookie) {
    res.clearCookie("authCookie");
    if (req.cookie.authCookie === null || req.cookie.authCookie === undefined) {
      res.send(true);
    } else {
      res.send(false);
    }
  }
};
