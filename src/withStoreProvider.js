import React, { Component, useEffect } from 'react'

const withStoreProvider = WrappedComponent => {
    class withStoreProvider extends Component {

        state = null;

        syncStateWithGlobalState = globalState => {
            this.setState(globalState)
        }

        render() {
            if (this.state == null) {
                this.state = this.context.globalState.getState();
                this.context.globalState.subscribe(this.syncStateWithGlobalState);
            }
            return (
                <WrappedComponent
                    {...this.props}
                    globalState={this.state}
                    dispatch={this.context.createSetGlobalState(this.props)}
                />
            )
        }
    }

    return withStoreProvider
}

export default withStoreProvider