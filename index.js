module.exports = Auto;

function Auto (elem) {
    if (!(this instanceof Auto)) return new Auto(elem);
    var self = this;
    
    var div = document.createElement('div');
    div.style.display = 'inline-block';
    div.style.position = 'relative';
    if (elem.parentNode) {
        elem.parentNode.insertBefore(div, elem);
        elem.parentNode.removeChild(elem);
        div.appendChild(elem);
    }
    
    this.element = div;
    this.input = elem;
    this.ahead = elem.cloneNode(true);
    this.ahead.setAttribute('placeholder', '');
    
    css(this.ahead, {
        color: '#808080',
        position: 'absolute',
        zIndex: 5
    });
    css(this.input, {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 10
    });
    div.appendChild(this.ahead);
    
    this.input.addEventListener('keydown', function (ev) {
        if (ev.which === 9 || ev.keyCode === 9) {
            self.input.value = self.ahead.value;
            ev.preventDefault();
        }
    });
}

Auto.prototype.show = function (str) {
    this.ahead.value = this.input.value + str.slice(this.input.value.length);
};

function css (elem, params) {
    for (var key in params) elem.style[key] = params[key];
}
