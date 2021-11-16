var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie("mycookie", "value", { httpOnly: true, sameSite: "strict" })
  res.send("<iframe srcdoc=\"<html><script>const req = new XMLHttpRequest(); req.open('get', '/check_cookie'); req.send()</script></html>\" title=\"\"></iframe>")
});

router.get('/check_cookie', function(req, res, next) {
  console.info("request cookie", req.cookies)
  res.end()
});

module.exports = router;
