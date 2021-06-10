var TypescriptRollupStarter = (function (exports) {
  'use strict';

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

  return exports;

}({}));
//# sourceMappingURL=typescript-rollup-starter.js.map
