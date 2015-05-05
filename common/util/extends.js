Object.prototype.extend = function () {
    var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy;
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    if (typeof target !== "object" && typeof target !== "function") {
        target = {};
    }
    if (length === i) {
        target = this;
        --i;
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                if (deep && copy && (typeof copy === 'object' || typeof copy === 'array') && !copy.nodeType) {
                    var clone = src && (typeof src === 'object' || typeof src === 'array') ? src : typeof copy === 'array' ? [] : {};
                    target[name] = this.extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}
module.exports =
{
    merge: function (o1, o2, override) {
        for (var p in o2) {
            if (o2.hasOwnProperty(p) && (!o1.hasOwnProperty(p) || override)) {
                o1[p] = o2[p];
            }
        }
    }
}