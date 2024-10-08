import { Component } from 'react'
import PropTypes from 'prop-types'
import GlobalState from './GlobalState'

class Broadcast extends Component {

    static propTypes = {
        globalState: PropTypes.object.isRequired,
        createSetGlobalState: PropTypes.func.isRequired
    }

    static childContextTypes = {
        globalState: PropTypes.object.isRequired,
        createSetGlobalState: PropTypes.func.isRequired
    }

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