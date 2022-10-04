import React from 'react'
import MainTasksDisplay from './MainTasksDisplay'
import HistoryContainer from './HistoryContainer'

class WorkHistoryItem extends React.Component{
    constructor(props){
        super(props)
        this.handleHistoryEdit = this.handleHistoryEdit.bind(this)
    }

    handleHistoryEdit(event){
        const {editWorkHistoryRequest, workHistoryElement, workHistoryElementIndex} = this.props
        event.preventDefault()
        editWorkHistoryRequest(workHistoryElement, workHistoryElementIndex)
    }

    render(){
        const {companyName, position, workStart, workEnd, mainTasksArray} = this.props.workHistoryElement
        const formattedStartDate = new Date(workStart).toLocaleDateString('en-GB')
        const formattedEndDate = new Date(workEnd).toLocaleDateString('en-GB')
        let mainTasksDisplay = null
        if(mainTasksArray.length > 0){
            mainTasksDisplay
            = <MainTasksDisplay mainTasksArray={mainTasksArray} />
        }
        return (
            <div className="work-history-item-container">
                <li>Worked in {companyName} as a {position} from {formattedStartDate} to {formattedEndDate}
                <button onClick={this.handleHistoryEdit}>edit</button>
                </li>
                <HistoryContainer title='Main Tasks'>
                    {mainTasksDisplay}
                </HistoryContainer>
            </div>
        )
    }
}

export default WorkHistoryItem