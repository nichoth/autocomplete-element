var auto = require('../');
var input = document.querySelector('input');

var months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
var ch = auto(input);
input.addEventListener('keyup', function () {
    if (!input.value.length) return ch.show('');
    for (var i = 0; i < months.length; i++) {
        var m = months[i];
        if (lc(m.slice(0, input.value.length)) === lc(input.value)) {
            return ch.show(m);
        }
    }
});
function lc (x) { return x.toLowerCase() }
