/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-pell',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/ember-pell/pell.min.js');
    app.import('vendor/ember-pell/pell.css');

    app.import('vendor/ember-pell/shims/pell.js');
  },

  pellPath() {
    return path.join(this.app.project.nodeModulesPath, '/pell/dist');
  },

  treeForVendor(tree) {
    let trees = [tree];

    trees.push(new Funnel(this.pellPath(), {
      destDir: 'ember-pell',
      files: ['pell.min.js', 'pell.css']
    }));

    return mergeTrees(trees);
  },
};