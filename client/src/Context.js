import React, {Component} from 'react';
import Data from './Data';

const Context =  React.createContext();

export class Provider extends Component {
    // Put authentication here later

    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        // Put authentication here later

        const value = {
            data: this.data,
            actions: {
                signIn: this.signIn,
            }
        }

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    signIn = async(email,password) => {
        const user = await this.data.getUser(email,password); 
    }
}

export const Consumer = Context.Consumer; 

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component){
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}