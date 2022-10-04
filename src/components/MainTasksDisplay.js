import React from 'react'

import uniqid from 'uniqid'

class MainTaskDisplay extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            this.props.mainTasksArray.map((mainTask, index) => {
                return (
                    <li key={uniqid()}>{mainTask}</li>
                )
            })
        )
    }
}

export default MainTaskDisplay