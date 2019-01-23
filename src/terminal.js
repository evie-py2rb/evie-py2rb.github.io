import React from 'react';
import { withRouter } from 'react-router-dom'
import Typed from 'typed.js';
import { Row, Col, Button } from 'reactstrap';

export class TerminalComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            welcomeComplete: false
        }
    }

    componentDidMount() {
        var options = {
            strings: [
                        "<i>Welcome</i> to Evie <strong>py2rb</strong> tutorial.^600",
                        "If you're not a python nerd - ",
                        "Abort immediately!!!",
                        "I repeat...ABORT immediately!!!"

                    ],
            smartBackspace: true,
            typeSpeed: 50,
            backSpeed: 15,
            loop: true,
            loopCount: Infinity
        }
    
        var typed = new Typed(".typed", options);
        setTimeout(() => {
            this.setState({
                welcomeComplete: true
            });
        }, 2000);
    }

    startTutorial = () => {
        this.props.history.push('/abc');
    }

    abort = () => {
        window.location = 'https://evie.ai';
    }

    render() {
        return (
            <React.Fragment>
                <div className="term">
                    <div className="typed"></div>
                </div>
                <Row>
                    <Button
                        onClick={this.startTutorial}
                        color="success"
                        className="action-button" style={{opacity: this.state.welcomeComplete ? 1: 0}}>
                        Let's Start
                    </Button>
                    <Button
                        onClick={this.abort}
                        color="danger"
                        className="action-button abort" style={{opacity: this.state.welcomeComplete ? 1: 0}}>
                        Abort
                    </Button>
                </Row>
            </React.Fragment>
        )
    }
}

// export const TerminalComponent = withRouter(({ history }) => Terminal);