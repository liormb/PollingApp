/**
 * Created by liormb on 9/25/15.
 */

var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

app.listen(port, function () {
    console.log('Server is running at http://localhost:' + port);
});
