import React from 'react'
import FormControl from './FormControl'
import InputSection from './InputSection'
import HistoryContainer from './HistoryContainer'
import uniqid from 'uniqid'

class WorkExpInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            companyName: '',
            position: '',
            workStart: '',
            workEnd: '',
            mainTasksInput: '',
            mainTasksArray: [],
            //a boolean to indicate that a child component is inside the WorkExpInput component
            //inWorkExpInput: true
        }
        this.updateForm = this.updateForm.bind(this)
        this.addMainTask = this.addMainTask.bind(this)
        this.updateHistory = this.updateHistory.bind(this)
        this.resetInputFields= this.resetInputFields.bind(this)
    }


    updateForm(name, value){
        this.setState({
          [name] : value
        })
    }

    addMainTask(event){
        event.preventDefault()
        this.setState((state) => {
            return {
                mainTasksArray: state.mainTasksArray.concat(state.mainTasksInput)
            }
        })
    }

    resetInputFields(historyObj){
        //Reset the fields after the items have been added to history
        for(const historyItem in historyObj){
            this.setState({
              [historyItem]: '',
            })
        }
    }

    updateHistory(event){
        event.preventDefault()
        const {companyName, position, workStart, workEnd, mainTasksArray} = this.state
        const workData = {companyName, position, workStart, workEnd, mainTasksArray}
        //Sends the data to the overarching form
        this.props.updateHistory(workData)
        this.resetInputFields(workData)
    }

    componentDidMount(){
        const {workData} = this.props
        if(workData){
            const {companyName, position, workStart, workEnd, mainTasksArray} = workData
            this.setState({
                companyName,
                position,
                workStart,
                workEnd,
                mainTasksArray
            })
        }
    }

    render(){

        const {header, buttonPurpose} = this.props
        const {companyName, position, workStart, workEnd} = this.state

        const {mainTasksInput, mainTasksArray} = this.state
        
        //conditionally render mainTasksArray
        let mainTasksContainer = null
        if(mainTasksArray.length > 0){
            mainTasksContainer = <HistoryContainer className='main-tasks-container' title='Main Tasks'>
                <ul>
                    {mainTasksArray.map((mainTask) => {
                        return <li key={uniqid()}>{mainTask}</li>
                    })}
                </ul>
            </HistoryContainer>
        }

        return (
            <InputSection title={header}>
                <FormControl name='companyName' label='Company Name' value={companyName} updateForm={this.updateForm} />
                <FormControl name='position' label='Position'
                value={position} updateForm={this.updateForm} />
                <FormControl name='workStart' label='From' 
                value={workStart} updateForm={this.updateForm}
                type='date'/>
                 <FormControl name='workEnd' label='To' 
                value={workEnd} updateForm={this.updateForm}
                type='date'/>
                <FormControl name='mainTasksInput' label='Main Tasks' value={mainTasksInput}
                updateForm={this.updateForm}>
                    <button className='input-button' onClick={this.addMainTask}>Add</button>
                </FormControl>
                {mainTasksContainer}
                <button className="input-button work-exp-input-button" 
                onClick={this.updateHistory}>{buttonPurpose}</button>
            </InputSection>
        )
    }
}

export default WorkExpInput 