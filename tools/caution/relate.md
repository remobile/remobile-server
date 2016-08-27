在文件 ~/node/relax/relax/node_modules/relate-js/dist/index.js中修改
var relativeNodes = _normalize.relativeNodes;
为
var relativeNodes = _normalize.relativeNodes||[];


