// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.24/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/ObjectUtil",["dojo/number"],function(l){var f={populateObject:function(a,b,e){function c(d,a){function b(b){var h=d[b],k=a[b],g=h&&"object"===typeof h;void 0!==h&&(void 0===k?a[b]=h:k&&"object"===typeof k&&g?c(h,k):e&&(g?(k=a[b]={},c(h,k)):a[b]=d[b]))}if(d&&a&&!(Array.isArray(d)&&!Array.isArray(a)||Array.isArray(a)&&!Array.isArray(d)))if(Array.isArray(d))d.forEach(function(a,c){b(c)});else for(var k in d)b(k)}c(b,a);return a},filterByPattern:function(a,b){function e(a,
b,c){for(var d in a){var g=b[d];if("object"===typeof a[d]){if(g&&"object"===typeof g){var h=c[d]={};e(a[d],g,h)}}else void 0!==g&&(c[d]=g)}}var c={};e(b,a,c);return c},traverseObject:function(a,b){for(var e in a){var c=a[e];b(c);c&&"object"===typeof c&&f.traverseObject(c,b)}},copyOwnJsonProperties:function(a,b,e){b=b||{};for(var c in a){var d=a[c];a.hasOwnProperty(c)&&"function"!=typeof d&&(d&&"object"==typeof d&&e&&(d=e(c,d)),void 0!==d&&(b[c]=d))}return b},roundNumber:function(a,b){return"number"!==
typeof a?a:parseFloat(a.toFixed(void 0!==b?b:0))}},m;f.formatNumber=function(a,b){b="number"===typeof b?{places:b}:b||{};var e=b.places,c={};0<=e?c.places=e:e=-1;c=l.format(a,c);if(b.noSeparator){var d;void 0===m&&(m=l.format(9999,{places:0}).replace(/9/g,""));d=m;var f;if(d)for(;0<=(f=c.indexOf(d));)c=c.substr(0,f)+c.substr(f+1)}if(b.preserveTrailingZeroes||0>=e||!c)return c;for(d=c.length;0<e&&"0"==c.charAt(d-1);)d--,--e||d--;return c.substr(0,d)};f.parseNumber=function(a,b,e){if(""===a)return"undefined"!==
typeof e?e:NaN;if(null==a||"string"!==typeof a&&isNaN(a))return NaN;a=String(a);if(!a.trim())return void 0!==e?e:NaN;e=l.parse(a);isNaN(e)&&a.trim().length&&(e=Number(a));return isNaN(e)||void 0===b||0>b?e:l.round(e,b)};console.log("Current locale number: "+f.formatNumber(100000.123,{places:3}));return f});