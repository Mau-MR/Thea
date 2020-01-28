import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from "../firebase"

export default withRouter(class Productos extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        if(!firebase.getCurrentUsername()) {
			// not logged in
			alert('Por favor, primero introduce tu usuario')
            this.props.history.replace('/login')
            return null
		}
    }
    render() {
        return (
            <div>
                productos
            </div>
        )
    }
})
