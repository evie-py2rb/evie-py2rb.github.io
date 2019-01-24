import React from 'react';
import { CodeRendererComponent } from './coderenderer';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem , Row, Col} from 'reactstrap';

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
        this.stepNames = ["Interactive Console", "Function definition", "Comments", 'Arrays'];
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
`,
`$ python
Python 2.7.10 (default, Feb  7 2017, 00:08:15)
[GCC 4.2.1 Compatible Apple LLVM 8.0.0 (clang-800.0.34)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
>>> evie_cool_peeps = ["Evie", "Jin", "Yee Yee", "Madhav", "Jo", "Sheng", "Alyssa", "Wu Wei", "Ashish"]
>>> evie_cool_peeps
['Evie', 'Jin', 'Yee Yee', 'Madhav', 'Jo', 'Sheng', 'Alyssa', 'Wu Wei', 'Ashish']
>>> evie_cool_peeps.sort()
>>> evie_cool_peeps
['Alyssa', 'Ashish', 'Evie', 'Jin', 'Jo', 'Madhav', 'Sheng', 'Wu Wei', 'Yee Yee']
# oops forgot TK!!
>>> evie_cool_peeps.append("TK")
['Alyssa', 'Ashish', 'Evie', 'Jin', 'Jo', 'Madhav', 'Sheng', 'Wu Wei', 'Yee Yee', 'TK']
# in python - arrays/ lists can be heterogeneous, right?
>>> another_array = [1, 2, 'Evie', 6.0, True]
>>> len(another_array) # checking length of array
5
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
    # but is useful for exiting a function midway
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
`,
`$ irb
irb(main):001:0* evie_cool_peeps = ["Evie", "Jin", "Yee Yee", "Madhav", "Jo", "Sheng", "Alyssa", "Wu Wei", "Ashish"]
=> ["Evie", "Jin", "Yee Yee", "Madhav", "Jo", "Sheng", "Alyssa", "Wu Wei", "Ashish"]
irb(main):02:0>
irb(main):03:0* evie_cool_peeps.sort() # unlike python this won't modify the same array
=> ["Alyssa", "Ashish", "Evie", "Jin", "Jo", "Madhav", "Sheng", "Wu Wei", "Yee Yee"]
irb(main):004:0> evie_cool_peeps # notice - the original array is still unmodified!
=> ["Evie", "Jin", "Yee Yee", "Madhav", "Jo", "Sheng", "Alyssa", "Wu Wei", "Ashish"]
# oops forgot TK!!
irb(main):005:0* evie_cool_peeps.push("TK") # this is how you append in ruby array
=> ["Evie", "Jin", "Yee Yee", "Madhav", "Jo", "Sheng", "Alyssa", "Wu Wei", "Ashish", "TK"]
# just like python, ruby arrays can be heterogeneous too!
irb(main):006:0* another_array = [1, 2, 'Evie', 6.0, True]
=> [1, 2, "Evie", 6.0, true]
irb(main):006:0* another_array.size # checking length of array
=> 5
`
];
        this.equalizeCodes();
        this.state = {
            currentPage: currentPage,
            pythonCode: this.pythonCodes[currentPage],
            rubyCode: this.rubyCodes[currentPage],
            dropdownOpen: false
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
            this.goTo(currentPage);            
        }
    }

    previous = () => {
        if (this.state.currentPage > 0) {
            const currentPage = this.state.currentPage - 1;
            this.goTo(currentPage);
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    goTo = (i) => {
        this.setState({
            currentPage: i,
            pythonCode: this.pythonCodes[i],
            rubyCode: this.rubyCodes[i],
        });
        this.props.history.push(`/tutorial/${i+1}`);
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
                        <div className="center">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                {`${this.state.currentPage+1}. ${this.stepNames[this.state.currentPage]}`}
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.stepNames.map((stepName, i) => {
                                    return <DropdownItem
                                            disabled={(i === this.state.currentPage)? true : null}
                                            style={{cursor: 'pointer'}}
                                            onClick={()=>this.goTo(i)}>{`${i+1}. ${stepName}`}
                                        </DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        </div>
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
