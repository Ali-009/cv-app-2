import React from 'react'

class WorkHistoryItem extends React.Component{
    constructor(props){
        super(props)
        this.handleHistoryEdit = this.handleHistoryEdit.bind(this)
    }

    handleHistoryEdit(event){
        event.preventDefault()
    }

    render(){
        const {companyName, position, workStart, workEnd} = this.props.workHistoryElement
        const formattedStartDate = new Date(workStart).toLocaleDateString('en-GB')
        const formattedEndDate = new Date(workEnd).toLocaleDateString('en-GB')
        return (
            <li>Worked in {companyName} as a {position} from {formattedStartDate} to {formattedEndDate}
            <button onClick={this.handleHistoryEdit}>edit</button></li>
        )
    }
}

export default WorkHistoryItem