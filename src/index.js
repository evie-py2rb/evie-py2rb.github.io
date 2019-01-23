import React from 'react';
import { render } from 'react-dom';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        
        return (
          <div>
            Testing react setup
          </div>
        );
    }
}

render(<Home />, document.getElementById('evie-entry'));