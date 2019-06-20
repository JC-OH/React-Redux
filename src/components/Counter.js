import React, {Component} from 'react';
import Control from './Control'
import Value from './Value'

class Counter extends Component {
    static propTypes = {
    }

    static defaultProps = {
    }

    render() {
        return (
            <div>
                <Value/>
                <Control/>
            </div>
        );
    }
}

export default Counter;