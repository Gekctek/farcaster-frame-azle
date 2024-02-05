# getprop

Get a property from nested object, the easy way.

Antiquated way:

```javascript
var value = 'default value';

if (
  obj &&
  obj.qux &&
  obj.qux.zee &&
  obj.qux.zee.peep &&
  obj.qux.zee.peep[2] &&
  obj.qux.zee.peep[2].__data) {

  value = obj.qux.zee.peep[2].__data;
}
```

with getProp:

```javascript
var value = getProp(obj, ['qux', 'zee', 'peep', 2, '__data']);
```

# Install

```bash
npm install get-prop
```

```bash
bower install getprop
```

# Usage

```javascript
var getProp = require('get-prop');

var obj = {
  foo: 'bar',
  qux: {
    zee: {
      boop: 4,
      peep: [55,'zonk', {
        __data: 'pow'
      }],
    },
    'key.with.dots': 'hello',
    '"key.with.quotes"': {
      greet: 'hi'
    },
    $el: 'element'
  },
  'foo.bar': 'noob',
  qax: null
};

// array for path (recommended)
getProp(obj, ['foo']) // 'bar'
getProp(obj, ['deedee']) // undefined
getProp(obj, ['deedee'], "I'm default value") // "I'm default value"
getProp(obj, ['qux', 'zee', 'boop']) // 'yo'
getProp(obj, ['qux', 'zee', 'peep', 0]) // 55
getProp(obj, ['qux', 'zee', 'peep', 1]) // 'zonk'
getProp(obj, ['qux', 'key.with.dots']) // 'hello'
getProp(obj, ['qux', '"key.with.quotes"', 'greet']) // 'hi'
getProp(obj, ['qux', 'zee', 'peep', 2]) // {__data: 'pow'}
getProp(obj, ['qux', 'zee', 'peep', 2, '__data']) // 'pow'
getProp(obj, ['qux', '$el']) // 'element'
getProp(obj, ['foo.bar']) // 'noob'
getProp(obj, ['qux', 'qux']) // undefined

// string for path
getProp(obj, 'foo') // 'bar'
getProp(obj, 'deedee') // undefined
getProp(obj, 'deedee', "I'm default value") // "I'm default value"
getProp(obj, 'qux.zee.boop') // 'yo'
getProp(obj, 'qux.zee.peep.0') // 55
getProp(obj, 'qux.zee.peep.1') // 'zonk'
getProp(obj, 'qux.zee.peep[1]') // 'zonk'
getProp(obj, 'qux[key.with.dots]') // 'hello'
getProp(obj, 'qux["key.with.quotes"].greet') // 'hi'
getProp(obj, 'qux.zee.peep.2') // {__data: 'pow'}
getProp(obj, 'qux.zee.peep.2.__data') // 'pow'
getProp(obj, 'qux.$el') // 'element'
getProp(obj, '[foo.bar]') // 'noob'
getProp(obj, 'qux.qux') // undefined
```

Partially applied:

```
var objProp = getProp(obj);

objProp(['foo']) //  'bar'
objProp('[foo.bar']) // 'noob'
objProp(['qux']) // 'noob'
objProp(['yo'], 'wut') // 'wut'
```

For a boolean version of this, check out the module [hasprop](https://github.com/miguelmota/hasprop).

# License

MIT
