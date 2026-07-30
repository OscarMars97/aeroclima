const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const layers = [{ classList: classes(), style: {} }, { classList: classes(), style: {} }];
const images = [];
const bodyClasses = classes();
const context = {
  window: {},
  localStorage: { getItem: () => null, setItem: () => {} },
  document: {
    body: { classList: bodyClasses },
    documentElement: { classList: classes() },
    querySelectorAll: () => layers
  },
  Image: class {
    constructor() { images.push(this); }
    set src(value) { this.url = value; }
  },
  console
};
context.window = context;
vm.runInNewContext(fs.readFileSync('js/background-manager.js', 'utf8'), context);

const manager = new context.LocalBackgroundManager();
manager.init();
manager.syncTheme(false);
images[0].onload(); // Carga vieja: no debe ocultar el fondo solicitado después.
images[1].onload();

assert.equal(layers.filter((layer) => layer.classList.contains('is-visible')).length, 1);
assert.match(layers.find((layer) => layer.classList.contains('is-visible')).style.backgroundImage, /light\/beach\.webp/);
console.log('Background manager race-condition test passed.');

function classes() {
  const values = new Set();
  return {
    add: (value) => values.add(value),
    remove: (value) => values.delete(value),
    contains: (value) => values.has(value),
    toggle: (value, force) => { force ? values.add(value) : values.delete(value); }
  };
}
