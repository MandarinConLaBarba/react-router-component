# React Router Component

React router component allows you to define routes in your [React][] application
in a declarative manner, directly as a part of your component hierarchy.

Usage is as simple as just returning a configured router component from your
component's `render()` method:

    <Locations>
      <Location path="/" handler={MainPage} />
      <Location path="/users/:username" handler={UserPage} />
    </Locations>

Alternatively, if you don't prefer JSX:

    Locations(
      Location({path: "/", handler: MainPage}),
      Location({path: "/users/:username", handler: UserPage}))

Having routes defined as a part of your component hierarchy allows to
dynamically reconfigure routing based on your application state. For example you
can return a different set of allowed locations for anonymous and signed-in
users.

React router component can dispatch based on `location.pathname` or
`location.hash` if browser doesn't support History API.

Furthermore it provides advanced features like support for [full page server
side rendering][server-side], [multiple routers][multiple] on the same page and
[contextual routers][contextual].

Its functionality is tested using [Saucelabs][] on all modern browsers (IE >= 9,
Chrome >= 27, Firefox >= 25, Safari >= 6 and Mobile Safari on iPhone and iPad >=
6).

## Installation

React router component is packaged on npm:

    % npm install react-router-component

## Basic usage

First you require `react-router-component` library:

    var React = require('react')
    var Router = require('react-router-component')

If you are using JSX, don't forget to bring components from a library into
scope, cause JSX doesn't support namespaces yet:

    var Locations = Router.Locations
    var Location = Router.Location

Now you can define your application as a regular React component which renders
into `Locations` router:

    var App = React.createClass({

      render: function() {
        return (
          <Locations>
            <Location path="/" handler={MainPage} />
            <Location path="/users/:username" handler={UserPage} />
          </Locations>
        )
      }
    })

Direct children of `Locations` router must be `Location` route descriptors.

Each descriptor accepts a `path` property which specifies [URL
pattern][url-pattern] and a `handler` property which declares a component which
should render in case corresponding `path` is matched.

The final part is to render your `App` component which activates your router:

    React.renderComponent(App(), document.body)

In case no location is matched router would render into an empty set of
elements.

## Handling "404 Not Found" case

You might want to specify a fallback location which will be activated in case no
other location is matched. For that there's a special `NotFound` location:

    var NotFound = Router.NotFound

    var App = React.createClass({

      render: function() {
        return (
          <Locations>
            <Location path="/" handler={MainPage} />
            <Location path="/users/:username" handler={UserPage} />
            <NotFound handler={NotFoundPage} />
          </Locations>
        )
      }
    })

## Navigating between locations

To navigate between different locations React router component provides a `Link`
component. It renders into `<a>` DOM element but handles `"click"` by activating
a different location in the router.

As an example, let's see how `MainPage` component can be implemented with the
usage of the `Link` component to transition to a `UserPage`:

    var Link = require('react-router-component').Link

    var MainPage = React.createClass({

      render: function() {
        return (
          <div>
            Hello, this is main page of the application!
            Proceed to my <Link href="/users/andreypopp">user page</Link>.
          </div>
        )
      }
    })

Alternatively, if you have a reference to a router component instance, you can
call its `.navigate(href)` method to do a transition to a different location.
You can acquire a reference to a router by using React's [Refs][React-Refs]
mechanism.

## Advanced usage

Advanced features include support for [full page server
side rendering][server-side], [multiple routers][multiple] on the same page and
[contextual routers][contextual].

[hash-routing]: hash-routing
[server-side]: server-side
[multiple]: multiple
[contextual]: contextual
[url-pattern]: url-pattern

[React]: http://facebook.github.io/react/
[React-Refs]: http://facebook.github.io/react/docs/more-about-refs.html
[React-Shims]: http://facebook.github.io/react/docs/working-with-the-browser.html#polyfills-needed-to-support-older-browsers
[Saucelabs]: saucelabs.com