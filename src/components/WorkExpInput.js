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
        this.editMainTasks = this.editMainTasks.bind(this)
    }

    addWorkHistory(event){
        event.preventDefault()
        this.props.updateWorkHistory()
    }

    addMainTask(event){
        event.preventDefault()
        this.props.updateMainTasks()
    }

    editMainTasks(event){
        event.preventDefault()
        this.props.editMainTasks()
    }

    render(){
        const {header, companyName, position, workStart, workEnd, updateForm, buttonPurpose} = this.props
        const {mainTasksInput, mainTasksArray} = this.props
        const {mainTasksEdit, mainTasksEditInput, editMainTasksRequest} = this.props
        let mainTasksDisplay = null
        //conditionally renering main tasks
        if(mainTasksArray.length > 0){
            mainTasksDisplay 
            = <MainTasksDisplay mainTasksArray={mainTasksArray} editMainTasksRequest={editMainTasksRequest}/>
        }
        //conditionally rendering an input to edit a main task
        let mainTasksEditControl = null
        if(mainTasksEdit){
            mainTasksEditControl =
            <FormControl name='mainTasksEditInput' label='Edit Main Task' value={mainTasksEditInput} updateForm={updateForm}>
                <button className='input-button' onClick={this.editMainTasks}>Edit</button>
            </FormControl>
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
                    {mainTasksEditControl}
                    {mainTasksDisplay}
                </HistoryContainer>
                <button className="input-button" 
                onClick={this.addWorkHistory}>{buttonPurpose}</button>
            </InputSection>
        )
    }
}

export default WorkExpInput 