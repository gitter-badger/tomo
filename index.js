'use strict';
let Cherry = {};
const Scanner     = require('./lib/Scanner').default,
      Parser      = require('./lib/Parser').default,
      Source      = require('./lib/Source').default,
      Tokenize    = require('./lib/Token').default,
      Stream      = require('./lib/Stream').default,
      Location    = require('./lib/Location').default,
      Range       = require('./lib/Location').Range,
      Collections = require('./lib/Collections').default,
      Utils       = require('./lib/Utils').default;

      
Cherry = { 
  Scanner, Parser, Source, 
  Tokenize, Collections, Utils, 
  Stream, Location, Range
};

if(window) {
  window.Cherry = Cherry;
  window.cherry = Cherry;
}
else module.exports = Cherry;