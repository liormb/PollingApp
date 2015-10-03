/**
 * Name: Lior Elrom
 * Date: 10/2/15
 * Time: 10:13 PM
 */

'use strict';

import React from 'react';

class Questions extends React.Component {

    constructor (props) {
        super(props);
        this.ask             = this.ask.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
    }

    ask(question) {
        this.props.emit('ask', question);
    }

    renderQuestions() {
        const { questions } = this.props;
        return questions.map((question, index) => {
            return (
                <div className="col-xs-12 col-sm-6 col-md-3"
                     key={index}
                     onClick={this.ask.bind(this, question)}>
                    <span>{question.q}</span>
                </div>
            );
        });
    }

    render () {
        return (
            <div id="questions" className="row">
                <h2>Questions</h2>
                {this.renderQuestions()}
            </div>
        );
    }
}

Questions.propTypes = {
    emit      : React.PropTypes.func,
    questions : React.PropTypes.array
};

Questions.defaultProps = {
    questions : []
};

export default Questions;