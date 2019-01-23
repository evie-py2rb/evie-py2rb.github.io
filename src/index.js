import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { TutorialComponent } from './tutorial';
import { TerminalComponent } from './terminal';

class Home extends React.Component {

    testRender() {
        console.log('abc');
    }

    render() {
        return (
            <Router>
                <div className="main">
                    <Route exact path="/" component={TerminalComponent}/>
                    <Route path="/abc" component={TutorialComponent}/>
                </div>
            </Router>
        );
    }
}

render(<Home />, document.getElementById('evie-entry'));