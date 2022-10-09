import React from 'react'
import MainTasksDisplay from './MainTasksDisplay'
import HistoryContainer from './HistoryContainer'
import WorkExpInput from './WorkExpInput'

class WorkHistoryItem extends React.Component{
    constructor(props){
        super(props)
        this.editWorkHistory = this.editWorkHistory.bind(this)
        this.displayWorkEdit = this.displayWorkEdit.bind(this)
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

    render(){
        const {companyName, position, workStart, workEnd, mainTasksArray} = this.props.workData
        const formattedStartDate = new Date(workStart).toLocaleDateString('en-GB')
        const formattedEndDate = new Date(workEnd).toLocaleDateString('en-GB')


        let mainTasksDisplay = null
        if(mainTasksArray.length > 0){
            mainTasksDisplay
            = <MainTasksDisplay mainTasksArray={mainTasksArray}/>
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
            <div className="work-history-item-container">
                <li>Worked in {companyName} as a {position} from {formattedStartDate} to {formattedEndDate}
                <button className='edit-button' onClick={this.displayWorkEdit}>edit</button>
                </li>
                <HistoryContainer title='Main Tasks'>
                    {mainTasksDisplay}
                </HistoryContainer>
                {workHistoryEditSection}
            </div>
        )
    }
}

export default WorkHistoryItem