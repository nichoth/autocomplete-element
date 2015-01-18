var isarray = require('isarray');

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
    var istyle = window.getComputedStyle(this.input);
    
    this.box = document.createElement('div');
    css(this.box, {
        display: 'none',
        position: 'absolute',
        top: this.input.offsetHeight,
        width: this.input.offsetWidth,
        maxHeight: '5em',
        overflowY: 'auto',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '3px',
        paddingLeft: istyle.paddingLeft,
        paddingRight: istyle.paddingRight,
        paddingTop: '3px',
        paddingBottom: '3px'
        
    });
    var prev;
    this.box.addEventListener('mousemove', function (ev) {
        onmouseout();
        if (ev.target === this) return;
        ev.target.style.backgroundColor = 'blue';
        ev.target.style.color = 'white';
        prev = ev.target;
    });
    this.box.addEventListener('mouseout', onmouseout);
    function onmouseout (ev) {
        if (prev) {
            prev.style.backgroundColor = 'inherit';
            prev.style.color = 'inherit';
        }
    }
    div.appendChild(this.box);
    
    this.input.addEventListener('keydown', function (ev) {
        if (ev.which === 9 || ev.keyCode === 9) {
            self.input.value = self.ahead.value;
            ev.preventDefault();
        }
    });
}

Auto.prototype.suggest = function (sgs) {
    if (!sgs) sgs = [ '' ];
    else if (!isarray(sgs)) sgs = [ sgs ];
    this.ahead.value = this.input.value
        + (sgs[0] || '').slice(this.input.value.length)
    ;
    if (sgs.length <= 1) return css(this.box, { display: 'none' });;
    this.box.innerHTML = '';
    
    css(this.box, { display: 'block' });
    for (var i = 0; i < sgs.length; i++) {
        var div = document.createElement('div');
        div.textContent = sgs[i];
        this.box.appendChild(div);
    }
};

function css (elem, params) {
    for (var key in params) elem.style[key] = params[key];
}
