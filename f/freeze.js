/* Shortcut for Object.freeze.
 *
 * Use Object.defineProperties if Object.freeze is not supported.
 * 
 * |Name  |Type  |Desc            |
 * |------|------|----------------|
 * |obj   |object|Object to freeze|
 * |return|object|Object passed in|
 * 
 * ```javascript
 * var a = {b: 1};
 * freeze(a);
 * a.b = 2;
 * console.log(a); // -> {b: 1}
 * ```
 */

exports = function (obj) 
{
    if (Object.freeze) return Object.freeze(obj);

    var propList = Object.getOwnPropertyNames(obj);

    propList.forEach(function (prop) 
    {
        if (!Object.getOwnPropertyDescriptor(obj, prop).configurable) return;

        Object.defineProperty(obj, prop, {
            writable: false,
            configurable: false
        });
    });

    return obj;
};