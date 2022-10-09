import React from 'react'
import uniqid from 'uniqid'

class MainTaskItem extends React.Component{
    constructor(props){
        super(props)
        this.handleMainTasksEdit = this.handleMainTasksEdit.bind(this)
    }

    handleMainTasksEdit(event){
        event.preventDefault()
        const {requestEdit, mainTaskIndex} = this.props
        requestEdit(mainTaskIndex)
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
        const {mainTasksArray, requestEdit, inWorkExpInput} = this.props
        let mainTasksList = []
        if(mainTasksArray.length > 0){
            mainTasksList = this.props.mainTasksArray.map((mainTask, index) => {
                return (
                    <MainTaskItem key={uniqid()} mainTask={mainTask} mainTaskIndex={index} requestEdit={requestEdit} inWorkExpInput={inWorkExpInput}/>
                )
            })
        }
        return mainTasksList
    }
}

export default MainTaskDisplay