import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import Familylist from "./components/family/list/index";
import AddFamily from "./components/family/add/index";
import store from "./store/index";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';



class App extends React.Component {
    render() {
        return (
            // pass the store into the provider
            <Provider store={store}>
                <Router>
                        <Switch>
                            <Route exact path='/' component={Familylist}></Route>
                            <Route exact path='/add' component={AddFamily}></Route>
                        </Switch>
                </Router>
            </Provider>
        )
    }
}
export default App