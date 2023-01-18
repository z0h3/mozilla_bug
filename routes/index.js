var express = require('express');
var router = express.Router();

const value = "" + Math.ceil(Math.random()*1000);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie("laxCookie", value, { sameSite: "lax" })
  res.cookie("strictCookie", value, { sameSite: "strict" })
  res.cookie("noneCookie", value, { sameSite: "none" })//none requires ssl for chrome...
  res.cookie("defaultCookie", value, { })
  var iframeCode = "<!DOCTYPE html><html>"
                   + "<body><div id='cookie'>Cookies</div><div id='result'>Result</div></body>"
                   + "<script>"
                   + "fetch('/check_cookie').then(res => res.text()).then(res => document.getElementById('result').innerHTML = res);"
                   + "document.getElementById('cookie').innerHTML = 'Cookies INSIDE: ' + document.cookie;"
                   + "</script>"
                   + "</html>";
  res.send(`<!DOCTYPE html><html lang='de'><body><div id="cookie">Cookies</div><iframe srcdoc="${iframeCode}" title="" width="100%"></iframe></body><script>document.getElementById('cookie').innerHTML = navigator.userAgent + '<br/>Cookies OUTSIDE: ' + document.cookie;</script></html>`)
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
