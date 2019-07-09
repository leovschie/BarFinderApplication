function checkCookies(req, res) {
  console.log("session is:", req.session.user.email);
  if (!req.cookies.authCookie) {
    res.send(false);
  } else {
    res.send(req.session.user.email);
  }
}
exports.checkCookies = checkCookies;
