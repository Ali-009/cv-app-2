import React from 'react'
import EducationInput from './EducationInput'

class EduHistoryItem extends React.Component{
    constructor(props){
        super(props)
        this.editEduHistory = this.editEduHistory.bind(this)
        this.displayEduEdit = this.displayEduEdit.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    displayEduEdit(event){
        event.preventDefault() 
        const {eduHistoryIndex, requestEdit} = this.props
        requestEdit(eduHistoryIndex)
    }

    editEduHistory(eduData){
        const {editHistory, eduHistoryIndex} = this.props
        editHistory(eduData, eduHistoryIndex)
    }

    removeItem(event){
        event.preventDefault()
        const {eduHistoryIndex, removeFromHistory} = this.props
        removeFromHistory(eduHistoryIndex)
    }

    render() {
        const {studyTitle, school, eduStart, eduEnd} = this.props.eduData
        const formattedStartDate = new Date(eduStart).toLocaleDateString('en-GB')
        const formattedEndDate = new Date(eduEnd).toLocaleDateString('en-GB')

        //conditionally rendering the education edit section
        let eduHistoryEditSection = null;
        if(this.props.beingEdited){
            eduHistoryEditSection =
            <EducationInput header='Edit Education History' buttonPurpose='Edit' 
            eduData={this.props.eduData} updateHistory={this.editEduHistory}/>
        }

        return (
            <div className='history-item edu-history-item'>
                <li>Studied {studyTitle} in {school} from {formattedStartDate} to {formattedEndDate}
                <button className='history-button edit-button' onClick={this.displayEduEdit}>edit</button>
                <button className='history-button remove-button' onClick={this.removeItem}>remove</button></li>
                {eduHistoryEditSection}
            </div>
        )
    }
}

export default EduHistoryItem