import React from 'react'
import FormControl from './FormControl'
import InputSection from './InputSection'
import HistoryContainer from './HistoryContainer'

import MainTasksDisplay from './MainTasksDisplay'

class WorkExpInput extends React.Component{
    constructor(props){
        super(props)
        this.addWorkHistory = this.addWorkHistory.bind(this)
        this.addMainTask = this.addMainTask.bind(this)
    }

    addWorkHistory(event){
        event.preventDefault()
        this.props.updateWorkHistory()
    }

    addMainTask(event){
        event.preventDefault()
        this.props.updateMainTasks()
    }

    render(){
        const {header, companyName, position, workStart, workEnd, updateForm, buttonPurpose} = this.props
        const {mainTasksInput, mainTasksArray} = this.props
        let mainTasksDisplay = null
        if(mainTasksArray.length > 0){
            mainTasksDisplay 
            = <MainTasksDisplay mainTasksArray={mainTasksArray}/>
        }
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
                    {mainTasksDisplay}
                </HistoryContainer>
                <button className="input-button" 
                onClick={this.addWorkHistory}>{buttonPurpose}</button>
            </InputSection>
        )
    }
}

export default WorkExpInput 