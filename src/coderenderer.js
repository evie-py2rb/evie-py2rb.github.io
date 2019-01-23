import React from 'react';
import hljs from 'highlight.js/lib/highlight';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
hljs.registerLanguage('python', python);
hljs.registerLanguage('ruby', ruby);


export class CodeRendererComponent extends React.Component {

    componentDidMount() {
        this.codeRef.innerHTML = this.props.code;
        hljs.highlightBlock(this.codeRef);
    }

    componentDidUpdate() {
        this.codeRef.innerHTML = this.props.code;
        hljs.highlightBlock(this.codeRef);
    }

    render() {
        const min = (this.props.min == null || this.props.min)? true : false;
        return (
            <div className='code-renderer'>
                <pre>
                    <code className={`hljs`} ref={(node) => this.codeRef = node}>
                    </code>
                </pre>
            </div>
        )
    }
}