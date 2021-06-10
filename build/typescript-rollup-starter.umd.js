(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TypescriptRollupStarter = {}));
}(this, (function (exports) { 'use strict';

  function util1() {
      console.log('util1');
  }

  function util2() {
      console.log('util2');
  }

  function sayWord(word) {
      console.log(word);
  }

  exports.default = sayWord;
  exports.util1 = util1;
  exports.util2 = util2;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=typescript-rollup-starter.umd.js.map
