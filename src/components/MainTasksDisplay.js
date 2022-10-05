import React from 'react'

import uniqid from 'uniqid'

class MainTaskItem extends React.Component{
    constructor(props){
        super(props)
        this.handleMainTasksEdit = this.handleMainTasksEdit.bind(this)
    }

    handleMainTasksEdit(event){
        const {editMainTasksRequest, mainTask, mainTaskIndex} = this.props
        event.preventDefault()
        editMainTasksRequest(mainTask, mainTaskIndex)
    }

    render(){
        return (
            <li>{this.props.mainTask}
                <button className='edit-button' onClick={this.handleMainTasksEdit}>edit</button>
            </li>
        )
    }
}

class MainTaskDisplay extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
        return (
            this.props.mainTasksArray.map((mainTask, index) => {
                const {editMainTasksRequest} = this.props
                return (
                    <MainTaskItem key={uniqid()} mainTask={mainTask} mainTaskIndex={index} editMainTasksRequest={editMainTasksRequest} />
                )
            })
        )
    }
}

export default MainTaskDisplay