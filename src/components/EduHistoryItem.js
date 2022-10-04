import React from 'react'

class EduHistoryItem extends React.Component{
    constructor(props){
        super(props)
        this.handleHistoryEdit = this.handleHistoryEdit.bind(this)
    }

    handleHistoryEdit(event){
        const {editEduHistoryRequest, eduHistoryElement, eduHistoryElementIndex} 
        = this.props
        event.preventDefault()
        editEduHistoryRequest(eduHistoryElement, eduHistoryElementIndex)
    }

    render() {
        const {studyTitle, school, eduStart, eduEnd} = this.props.eduHistoryElement
        const formattedStartDate = new Date(eduStart).toLocaleDateString('en-GB')
        const formattedEndDate = new Date(eduEnd).toLocaleDateString('en-GB')
        return (
            <li>Studied {studyTitle} in {school} from {formattedStartDate} to {formattedEndDate}
            <button onClick={this.handleHistoryEdit}>edit</button></li>
        )
    }
}

export default EduHistoryItem