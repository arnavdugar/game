var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

games = {};
count = Math.floor(Math.random() * 99400891);

app.get('/', function(request, response) {
    response.render('index');
});

chars = '0123456789abcdefghijklmnopqrstuvwxyz'

function getID(value) {
    n = 9967 * 9973;
    p = 17
    value %= n;
    var hash = 1;
    while(p != 0) {
        if(p % 2 == 1) {
            hash = (hash * value) % n;
        }
        value = (value * value) % n;
        p >>= 1;
    }
    var id = '';
    while(hash > 0) {
        var index = hash % chars.length
        id = chars[index] + id;
        hash = (hash - index) / chars.length
    }
    return id;
}

app.get('/new', function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    var id = getID(count);
    games[id] = true;
    response.redirect('/g' + id);
    count += 1;
});

app.get('/g:id', function(request, response) {
    var id = request.params.id
    if(id in games) {
        response.render('game');
    } else {
        response.status(404);
        response.render('404', {url: request.url});
    }
});

app.use(function(request, response){
    response.status(404);
    response.render('404', {url: request.url});
});

app.listen(app.get('port'));
