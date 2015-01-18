# autocomplete-element

Wire up autocomplete for an `<input type="text">` element.

# example

[Try this example.](https://53ce41460d60233a5f8f6c8d356589c4e0a5aaa9.htmlb.in)

Auto-complete the months.

``` js
var auto = require('autocomplete-element');
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
```

# methods

``` js
var c = auto(input, fn)
```

Create a new autocomplete instance `c` that wraps an `input` element and
optionally sets up a keydown listener `fn`.

`fn(c, ev)` fires when there is new text input to deal with.

## c.suggest(suggestions)

Auto-complete an array of `suggestions`. The first suggestion in the array is
shadowed under the active text.

## c.set(value)

Set the value for the input text and the shadow text.

# install

With [npm](https://npmjs.org) do:

```
npm install autocomplete-element
```

# license

MIT
