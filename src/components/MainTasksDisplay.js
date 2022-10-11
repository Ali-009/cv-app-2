import React from 'react'
import uniqid from 'uniqid'

class MainTaskItem extends React.Component{
    constructor(props){
        super(props)
        this.handleMainTasksEdit = this.handleMainTasksEdit.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    handleMainTasksEdit(event){
        event.preventDefault()
        const {requestEdit, mainTaskIndex} = this.props
        requestEdit(mainTaskIndex)
    }

    removeItem(event){
        event.preventDefault()
        const {mainTaskIndex, removeFromHistory} = this.props
        removeFromHistory(mainTaskIndex)
    }

    render(){
        return (
            <li>{this.props.mainTask}<button className='history-button edit-button' onClick={this.handleMainTasksEdit}>edit</button>
            <button className='history-button remove-button' onClick={this.removeItem}>remove</button></li>
        )
    }
}

class MainTaskDisplay extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {mainTasksArray, requestEdit, removeFromHistory} = this.props
        let mainTasksList = []
        if(mainTasksArray.length > 0){
            mainTasksList = this.props.mainTasksArray.map((mainTask, index) => {
                return (
                    <MainTaskItem key={uniqid()} mainTask={mainTask} mainTaskIndex={index} requestEdit={requestEdit}
                    removeFromHistory={removeFromHistory}/>
                )
            })
        }
        return mainTasksList
    }
}

export default MainTaskDisplay