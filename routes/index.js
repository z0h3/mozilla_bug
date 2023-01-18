var express = require('express');
var router = express.Router();

const value = ""+Math.random();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie("laxCookie", value, { sameSite: "lax" })
  res.cookie("strictCookie", value, { sameSite: "strict" })
  res.cookie("noneCookie", value, { sameSite: "none" })//none requires ssl for chrome...
  res.cookie("defaultCookie", value, { })
  res.send('<!DOCTYPE html><html lang=\'de\'><body><iframe srcdoc="<!DOCTYPE html><html><script>fetch(\'/check_cookie\').then(res => res.text()).then(res => document.body.innerHTML =res);</script></html>" title=""></iframe></body></html>')
});

router.get('/check_cookie', function(req, res, next) {
  console.info("request cookie", req.cookies)
  var content = req.cookies["laxCookie"] === value ?
        '<span style="color:green">1.lax-PASS</span><br/>' :
        '<span style="color:red">1.lax-FAIL</span><br/>';
  content += req.cookies["strictCookie"] === value ?
        '<span style="color:green">2.strict-PASS</span><br/>' :
        '<span style="color:red">2.strict-FAIL</span><br/>';
  content += req.cookies["noneCookie"] === value ?
        '<span style="color:green">3.none-PASS(SSL-Required)</span><br/>' :
        '<span style="color:red">3.none-FAIL(SSL-Required)</span><br/>';
  content += req.cookies["defaultCookie"] === value ?
        '<span style="color:green">4.def-PASS</span><br/>' :
        '<span style="color:red">4.def-FAIL</span><br/>';
  res.end(content)
});

module.exports = router;
