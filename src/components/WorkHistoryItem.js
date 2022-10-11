import React from 'react'
import WorkExpInput from './WorkExpInput'
import uniqid from 'uniqid'

class WorkHistoryItem extends React.Component{
    constructor(props){
        super(props)
        this.editWorkHistory = this.editWorkHistory.bind(this)
        this.displayWorkEdit = this.displayWorkEdit.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    displayWorkEdit(event){
        event.preventDefault()
        const {workHistoryIndex, requestEdit} = this.props
        requestEdit(workHistoryIndex)
    }

    editWorkHistory(workData){
        const {editHistory, workHistoryIndex} = this.props
        editHistory(workData, workHistoryIndex)
    }

    removeItem(event){
        event.preventDefault()
        const {workHistoryIndex, removeFromHistory} = this.props
        removeFromHistory(workHistoryIndex)
    }

    render(){
        const {companyName, position, workStart, workEnd, mainTasksArray} = this.props.workData
        const formattedStartDate = new Date(workStart).toLocaleDateString('en-GB')
        const formattedEndDate = new Date(workEnd).toLocaleDateString('en-GB')


        let mainTasksDisplay = null
        if(mainTasksArray.length > 0){
            const mainTasksList = mainTasksArray.map((mainTask) => {
                return <li key={uniqid()}>{mainTask}</li>
            })
            mainTasksDisplay
            = <div className='main-tasks-container'>
                <h4>Main Tasks</h4>
                <ul>
                    {mainTasksList}
                </ul>
            </div>
        }

        //conditionally rendering the work history edit section
        let workHistoryEditSection = null
        if(this.props.beingEdited){
            workHistoryEditSection
            = <WorkExpInput header='Edit Work History'
            buttonPurpose='Edit'
            workData={this.props.workData} updateHistory={this.editWorkHistory}/>
        }
        return (
            <div className="history-item work-history-item">
                <li>Worked at {companyName} as a {position} from {formattedStartDate} to {formattedEndDate}
                <button className='history-button edit-button' onClick={this.displayWorkEdit}>edit</button>
                <button className='history-button remove-button' onClick={this.removeItem}>remove</button>
                </li>
                {mainTasksDisplay}
                {workHistoryEditSection}
            </div>
        )
    }
}

export default WorkHistoryItem