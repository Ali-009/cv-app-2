import React from 'react'
import FormControl from './FormControl'
import InputSection from './InputSection'
import HistoryContainer from './HistoryContainer'

class WorkExpInput extends React.Component{
    constructor(props){
        super(props)
        this.addWorkHistory = this.addWorkHistory.bind(this)
    }

    addWorkHistory(event){
        event.preventDefault()
        this.props.updateWorkHistory()
    }

    render(){
        const {header, companyName, position, workStart, workEnd, mainTasksInput, updateForm, buttonPurpose} = this.props
        return (
            <InputSection title={header}>
                <FormControl name='companyName' label='Company Name' value={companyName} updateForm={updateForm} />
                <FormControl name='position' label='Position'
                value={position} updateForm={updateForm} />
                <FormControl name='workStart' label='From' 
                value={workStart} updateForm={updateForm}
                type='date'/>
                 <FormControl name='workEnd' label='To' 
                value={workEnd} updateForm={updateForm}
                type='date'/>
                <FormControl name='mainTasksInput' label='Main Tasks' value={mainTasksInput}
                updateForm={updateForm}>
                    <button className='input-button' onClick={this.addMainTask}>Add</button>
                </FormControl>
                <HistoryContainer title='Main Tasks'>

                </HistoryContainer>
                <button className="input-button" 
                onClick={this.addWorkHistory}>{buttonPurpose}</button>
            </InputSection>
        )
    }
}

export default WorkExpInput 