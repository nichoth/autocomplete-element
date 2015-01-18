var auto = require('../');
var input = document.querySelector('input');

var months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
auto(input, function (c) {
    if (!input.value.length) return c.suggest([]);
    var matches = months.filter(function (m) {
        return lc(m.slice(0, input.value.length)) === lc(input.value);
    });
    c.suggest(matches);
});
function lc (x) { return x.toLowerCase() }
