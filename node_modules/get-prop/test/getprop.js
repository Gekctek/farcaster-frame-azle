var test = require('tape');
var getProp = require('../getprop');

test('getProp', function (t) {
  t.plan(45);

  var obj = {
    foo: 'bar',
    qux: {
      zee: {
        boop: 'yo',
        num: 4,
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
    bar: {
      baz: {
        bar: 9
      }
    },
    'foo.bar': 'noob',
    qax: null
  };

  t.equal(getProp(obj, 'foo'), 'bar');
  t.equal(getProp(obj, 'deedee'), undefined);
  t.equal(getProp(obj, 'deedee', "I'm default value"), "I'm default value");
  t.equal(getProp(obj, 'qux.zee.boop'), 'yo');
  t.equal(getProp(obj, 'qux.zee.num'), 4);
  t.equal(getProp(obj, 'qux.zee.peep.0'), 55);
  t.equal(getProp(obj, 'qux.zee.peep.1'), 'zonk');
  t.equal(getProp(obj, 'qux.zee.peep[1]'), 'zonk');
  t.equal(getProp(obj, 'qux[key.with.dots]'), 'hello');
  t.equal(getProp(obj, 'qux["key.with.quotes"].greet'), 'hi');
  t.deepEqual(getProp(obj, 'qux.zee.peep.2'), {__data: 'pow'});
  t.equal(getProp(obj, 'qux.zee.peep.2.__data'), 'pow');
  t.equal(getProp(obj, 'qux.$el'), 'element');
  t.equal(getProp(obj, 'bar.baz.bar'), 9);
  t.equal(getProp(obj, 'bar.baz.bar.nope'), undefined);
  t.equal(getProp(obj, ''), undefined);
  t.equal(getProp(obj, {}), undefined);
  t.equal(getProp(obj, 3), undefined);
  t.equal(getProp(obj, 'nah.1.0'), undefined);
  t.equal(getProp('foo.bar', ''), undefined);
  t.equal(getProp(obj, '[foo.bar]'), 'noob');
  t.equal(getProp(obj, 'qax.quz'), undefined);
  t.equal(getProp(null, 'yo'), undefined);
  t.equal(getProp(null, 'yo', 'wut'), 'wut');
  t.equal(getProp(obj, ['deedee']), undefined);
  t.equal(getProp(obj, ['qux', 'zee', 'boop']), 'yo');
  t.equal(getProp(obj, ['qux', 'zee', 'num']), 4);
  t.equal(getProp(obj, ['qux', 'zee', 'peep', 0]), 55);
  t.equal(getProp(obj, ['qux', 'zee', 'peep', '1']), 'zonk');
  t.equal(getProp(obj, ['qux', 'key.with.dots']), 'hello');
  t.equal(getProp(obj, ['qux', '"key.with.quotes"', 'greet']), 'hi');
  t.deepEqual(getProp(obj, ['qux', 'zee', 'peep', 2]), {__data: 'pow'});
  t.equal(getProp(obj, ['qux', 'zee', 'peep', 2, '__data']), 'pow');
  t.equal(getProp(obj, ['qux', '$el']), 'element');
  t.equal(getProp(obj, ['bar', 'baz', 'bar']), 9);
  t.equal(getProp(obj, ['bar', 'baz', 'bar', 'nope']), undefined);
  t.equal(getProp(obj, ['nah', 1, 0]), undefined);
  t.equal(getProp(obj, ['foo.bar']), 'noob');
  t.equal(getProp(obj, ['qax', 'quz']), undefined);
  t.equal(getProp(null, ['yo']), undefined);
  t.equal(getProp(null, ['yo'], 'wut'), 'wut');

  var objProp = getProp(obj);
  t.equal(objProp('foo'), 'bar');
  t.equal(objProp('[foo.bar]'), 'noob');
  t.equal(objProp('yo', 'wut'), 'wut');

  // oldschool
  var value = 'default value';
  if (
    obj &&
    obj.qux &&
    obj.qux.zee &&
    obj.qux.zee.peep &&
    obj.qux.zee.peep[1]) {

    value = obj.qux.zee.peep[2].__data;
  }

  t.equal(value, 'pow');
});
