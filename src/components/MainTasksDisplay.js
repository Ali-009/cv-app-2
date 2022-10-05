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
        const {mainTask, inWorkExpInput} = this.props
        let editButton = null
        if(inWorkExpInput){
            editButton = <button className='edit-button' onClick={this.handleMainTasksEdit}>edit</button>
        }
        return (
            <li>{mainTask}
                {editButton}
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
                const {editMainTasksRequest, inWorkExpInput} = this.props
                return (
                    <MainTaskItem key={uniqid()} mainTask={mainTask} mainTaskIndex={index} editMainTasksRequest={editMainTasksRequest} inWorkExpInput={inWorkExpInput}/>
                )
            })
        )
    }
}

export default MainTaskDisplay