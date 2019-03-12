var test = require('tape');

var create = require('../');
var glslify = require('glslify');
var Shader = require('gl-shader');

if (process.browser) throw Error('Test should run in node.js environment');

test('should return the color blue', function (t) {
  var draw = create(function (gl) {
    return Shader(gl,
      glslify('./shaders/test.vert'),
      glslify('./shaders/blue.frag')
    );
  }, {
    float: false
  });
  t.deepEqual(draw(), [0, 0, 1, 1]);
  t.end();
});

test('should be able to handle alpha', function (t) {
  var draw = create(glslify('./shaders/alpha.frag'));

  t.deepEqual(draw(), [0, 0, 1, 0]);
  t.end();
});

test('should process n-dim input', function (t) {
  var draw = create(glslify('./shaders/blue.frag'), {
    width: 2,
    height: 2
  });
  t.deepEqual(draw(), [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]);
  t.end();
});
