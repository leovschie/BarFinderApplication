function checkCookies(req, res) {
  if (!req.cookies.authCookie) {
    res.send(false);
  } else {
    res.send(true);
  }
}
exports.checkCookies = checkCookies;
