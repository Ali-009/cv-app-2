import React from 'react'
import FormControl from './FormControl'
import InputSection from './InputSection'
import HistoryContainer from './HistoryContainer'

import MainTasksDisplay from './MainTasksDisplay'

class WorkExpInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            //a boolean to indicate that a child component is inside the WorkExpInput component
            inWorkExpInput: true
        }
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

        //conditionally rendering an input to edit a main task
        let mainTasksEditControl = null
        if(mainTasksEdit){
            mainTasksEditControl =
            <FormControl name='mainTasksEditInput' label='Edit Main Task' value={mainTasksEditInput} updateForm={updateForm}>
                <button className='input-button' onClick={this.editMainTasks}>Edit</button>
            </FormControl>
        }

        //conditionally render mainTasks
        let mainTasksContainer = null
        if(mainTasksArray.length > 0){
            mainTasksContainer = 
            <HistoryContainer title='Main Tasks'>
                {mainTasksEditControl}
                <MainTasksDisplay mainTasksArray={mainTasksArray} editMainTasksRequest={editMainTasksRequest}
                inWorkExpInput={this.state.inWorkExpInput}/>
            </HistoryContainer>
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
                {mainTasksContainer}
                <button className="input-button work-exp-input-button" 
                onClick={this.addWorkHistory}>{buttonPurpose}</button>
            </InputSection>
        )
    }
}

export default WorkExpInput 