import React, {Component} from "react";
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import hashHistory from "react-router/lib/hashHistory";
import {syncHistoryWithStore} from "react-router-redux";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {reducers} from "./redux";
import "./App.css";
import GitList from "./container/GitList";

class App extends Component {

    static configureStore() {
        const showDevTool = window.devToolsExtension && process.env.NODE_ENV != 'production';
        return compose(
            applyMiddleware(thunk),
            showDevTool ? window.devToolsExtension() : f => f
        )(createStore)(reducers);
    }

    constructor() {
        super();
        this.store = App.configureStore();
        this.history = syncHistoryWithStore(hashHistory, this.store);
    }

  render() {
      return (
          <Provider store={this.store}>
              <Router history={this.history}>
                  <Route path="/" component={GitList}/>
              </Router>
          </Provider>
      );
  }
}

export default App;
