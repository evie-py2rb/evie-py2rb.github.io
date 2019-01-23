import React from 'react';
import { CodeRendererComponent } from './coderenderer';
import { Row, Col } from 'reactstrap';

export class TutorialComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        console.log(this.props);
        const path = this.props.history.location.pathname.split('/');
        let currentPage = parseInt(path[path.length - 1]);
        if (isNaN(currentPage)) {
            currentPage = 0;
        }
        this.pythonCodes = [
            `def hello_world():
    print "Hello World!"

# call the function
hello_world()

'''
yeah, this is a comment too!
single line comments in python start with a hash - #

I'm a multi-line comment and
I'm sure you can figure out what I start and end with
'''\n\n\n\n\n\n`,
'print "Ashish" # this will print "Ashish"'
];

        this.rubyCodes = [`def hello_world # () we can add optional braces here too
    puts "Hello World!" # we use puts for printing
    # or
    print "Hello World!" # there's a 'print' as well in ruby
    # it's just 'puts' adds a newline after printing & 'print' doesn't
end # this is how you end a ruby function or in general a code block

# call the function
hello_world()
# or simply
hello_world # (yep braces are optional!)

=begin
in ruby we do it little differently,
start with a '=begin', write whatever you want
and close with a '=end'
ruby will consider everything in between as a comment
=end`,
'puts "Ashish" # this will print "Ashish"'
];
        this.state = {
            currentPage: currentPage,
            pythonCode: this.pythonCodes[currentPage],
            rubyCode: this.rubyCodes[currentPage],
        };
    }

    next = () => {
        if (this.state.currentPage < this.pythonCodes.length - 1) {
            this.setState({
                currentPage: this.state.currentPage + 1,
                pythonCode: this.pythonCodes[this.state.currentPage + 1],
                rubyCode: this.rubyCodes[this.state.currentPage + 1],
            })
        }
    }

    previous = () => {
        if (this.state.currentPage > 0) {
            this.setState({
                currentPage: this.state.currentPage - 1,
                pythonCode: this.pythonCodes[this.state.currentPage - 1],
                rubyCode: this.rubyCodes[this.state.currentPage - 1],
            })
        }
    }

    render() {
        console.log(this.state);
        return (
            <div style={{display: 'flex'}}>
                <div className="nav">
                    <a
                    onClick={this.previous}
                    className={`previous round ${this.state.currentPage <= 0? 'disabled' : ''}`}>&#8249;</a>
                </div>
                <Row style={{width:'100%'}}>
                    <Col xs="5" className="mb-4">
                        <h3 className="center">Python</h3>
                    </Col>
                    <Col xs="2" className="mb-4">
                        <h3 className="center"><small>vs</small></h3>
                    </Col>
                    <Col xs="5" className="mb-4">
                        <h3 className="center">Ruby  </h3>
                    </Col>
                    <Col xs="12" sm="6">
                        <CodeRendererComponent code={this.state.pythonCode}></CodeRendererComponent>
                    </Col>
                    <Col xs="12" sm="6">
                        <CodeRendererComponent code={this.state.rubyCode}></CodeRendererComponent>
                    </Col>
                </Row>
                <div className="nav">
                    <a 
                    onClick={this.next}
                    className={`next round ${this.state.currentPage >= this.pythonCodes.length - 1? 'disabled' : ''}`}>&#8250;</a>
                </div>
            </div>
        );
    }
}
