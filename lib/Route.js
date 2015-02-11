"use strict";

var React     = require('react'),
  NavigatableMixin = require('./NavigatableMixin');

function createClass(name) {
  return React.createClass({
    propTypes: {
      handler: React.PropTypes.element.isRequired,
      path: name === 'NotFound' ? 
        function(props, propName) {
          if (props[propName]) throw new Error("Don't pass a `path` to NotFound.");
        }
        : React.PropTypes.string.isRequired
    },
    getDefaultProps: function() {
      if (name === 'NotFound') {
        return {path: null};
      }
      return {};
    },
    render: function() {
      throw new Error(name + " is not meant to be directly rendered.");
    }
  });
}

var matchRoutes = require('./matchRoutes');

function createRedirectClass() {

  return React.createClass({

    propTypes: {
      redirectPath: React.PropTypes.element.isRequired,
      path: React.PropTypes.string.isRequired
    },
    getDefaultProps: function () {

      return {

        handler : React.createClass({

          mixins : [NavigatableMixin],

          render: function () {
            return React.createElement('div');
          },
          componentDidMount: function () {
            this.context.router.navigate(this.props.redirectPath);
          }
        })
      };
    },
    render: function () {
      throw new Error("Redirect is not meant to be directly rendered.");
    }
  });
}

module.exports = {
  /**
   * Regular route descriptor.
   *
   * @param {Object} spec
   */
  Route: createClass('Route'),
  /**
   * Catch all route descriptor.
   *
   * @param {Object} spec
   */
  NotFound: createClass('NotFound'),


  Redirect: createRedirectClass()

};
