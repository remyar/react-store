import { Component } from 'react'
import GlobalState from './GlobalState'

class Broadcast extends Component {

    globalState = new GlobalState(this.props.globalState)

    getChildContext() {
        return {
            globalState: this.globalState,
            createSetGlobalState: this.props.createSetGlobalState
        }
    }

   /* componentWillReceiveProps(nextProps) {
        this.globalState.setState(nextProps.globalState)
    }*/

    render() {
        this.globalState.setState(this.props.globalState)
        return this.props.children
    }
}

export default Broadcast