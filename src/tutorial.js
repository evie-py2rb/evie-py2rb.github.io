import React from 'react';
import { CodeRendererComponent } from './coderenderer';
import { Row, Col } from 'reactstrap';

export class TutorialComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        const path = this.props.history.location.pathname.split('/');
        let currentPage = parseInt(path[path.length - 1]);
        if (isNaN(currentPage)) {
            currentPage = 0;
        } else {
            currentPage -= 1;
        }
        this.stepNames = ["Interactive Console", "Function definition", "Comments"];
        this.pythonCodes = [
`# Opening an interactive python console
$ python
Python 2.7.10 (default, Feb  7 2017, 00:08:15)
[GCC 4.2.1 Compatible Apple LLVM 8.0.0 (clang-800.0.34)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> "Hello World"
'Hello World'
>>>
>>>
>>> 8+9
17
\n\n
# running a python file from terminal
$ python your_python_program.py
`,
`def hello_world(a, b, c=None):
    print "Hello World!"
    # return some value
    return "If you're happy and you know it, clap your hands!"

# call the function
hello_world("1", "2", "3")
`, 
`# nice, one liner comment!
'''
yeah, this is a comment too!
single line comments in python start with a hash - #

I'm a multi-line comment and
I'm sure you can figure out what I start and end with
'''
`
];

        this.rubyCodes = [
`# Opening an interactive ruby console
$ irb
irb(main):001:0> "Hello World"
=> "Hello World"
irb(main):002:0>
irb(main):003:0>
irb(main):004:0> 8+9
=> 17
\n\n\n\n\n
# running a ruby file from terminal
$ ruby your_ruby_program.rb
`
, `def hello_world(a, b, c=nil) # parentheses are optional, can be removed
    # unlike python indentation is optional in ruby    
    puts "Hello World!" # in ruby we use 'puts' for printing
    # or
    print "Hello World!" # there's a 'print' as well
    # it's just 'puts' adds a newline after printing & 'print' doesn't

    # this is how we return a value from a function in ruby
    return "If you're happy and you know it, clap your hands!"
    # note: 'return' keyword here is optional too!
    # but is used to exit a function midway
    # so this would work same as the above return statement:
    "If you're happy and you know it, clap your hands!"
end # this is how you end a ruby function or in general a code block

# call the function
hello_world("1", "2", "3")
# or simply
hello_world "1", "2" # (yep parentheses are optional!)
`,
`# nice, one liner comment! (same as python i.e, starts with a hash - #)
=begin
in ruby we do it little differently,
start with a '=begin', write whatever you want
and close with a '=end'
ruby will consider everything in between as a comment
=end
`
];
        this.equalizeCodes();
        this.state = {
            currentPage: currentPage,
            pythonCode: this.pythonCodes[currentPage],
            rubyCode: this.rubyCodes[currentPage],
        };
    }

    findMax(arr) {
        var max = 0;
        arr.forEach((val) => {
            max = Math.max(max, val.split('\n').length);
        });
        return max;
    }

    equalizeCodes() {
        this.equalizeCode(this.pythonCodes);
        this.equalizeCode(this.rubyCodes);
    }

    equalizeCode(arr) {
        const max = Math.max(this.findMax(this.pythonCodes), this.findMax(this.rubyCodes));
        for (var i = 0; i < arr.length; i++) {
            const code = arr[i];
            for (var j = 0; j < max - code.split('\n').length; j++) {
                arr[i] += '\n';
            }
        }
    }

    next = () => {
        if (this.state.currentPage < this.pythonCodes.length - 1) {
            const currentPage = this.state.currentPage + 1;
            this.setState({
                currentPage: currentPage,
                pythonCode: this.pythonCodes[currentPage],
                rubyCode: this.rubyCodes[currentPage],
            });
            this.props.history.push(`/tutorial/${currentPage+1}`);
        }
    }

    previous = () => {
        if (this.state.currentPage > 0) {
            const currentPage = this.state.currentPage - 1;
            this.setState({
                currentPage: currentPage,
                pythonCode: this.pythonCodes[currentPage],
                rubyCode: this.rubyCodes[currentPage],
            });
            this.props.history.push(`/tutorial/${currentPage+1}`);
        }
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <div className="nav">
                    <a
                    onClick={this.previous}
                    className={`previous round ${this.state.currentPage <= 0? 'disabled' : ''}`}>&#8249;</a>
                </div>
                <Row style={{width:'100%'}}>
                    <Col xs="5" className="mb-4 pb-2 ">
                        <h3 className="center bold">Python</h3>
                    </Col>
                    <Col xs="2" className="mb-4 pb-2">
                        <h3 className="center"><small>vs</small></h3>
                    </Col>
                    <Col xs="5" className="mb-4 pb-2">
                        <h3 className="center bold">Ruby  </h3>
                    </Col>
                    <Col xs="12" className="mb-4 pb-2">
                        <h5 className="center step-name bold">
                            {`${this.state.currentPage+1}. ${this.stepNames[this.state.currentPage]}`}
                        </h5>
                    </Col>
                    <Col xs="12" sm="6">
                        <CodeRendererComponent code={this.state.pythonCode} type="py"></CodeRendererComponent>
                    </Col>
                    <Col xs="12" sm="6">
                        <CodeRendererComponent code={this.state.rubyCode} type="rb"></CodeRendererComponent>
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
