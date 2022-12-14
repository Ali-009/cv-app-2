import React from 'react'
import FormControl from './FormControl'
import InputSection from './InputSection'
import MainTasksDisplay from './MainTasksDisplay'

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
            mainTaskEdit: '',
            mainTaskEditIndex: null,
            mainTasksBeingEdited: false,
        }
        this.updateForm = this.updateForm.bind(this)
        //methods for managing mainTasksArray
        this.addMainTask = this.addMainTask.bind(this)
        this.handleMainTaskEdit = this.handleMainTaskEdit.bind(this)
        this.editMainTask = this.editMainTask.bind(this)
        this.removeMainTask = this.removeMainTask.bind(this)
        //updating the overarching form and resetting the input fields afterwards
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
            if(Array.isArray(historyObj[historyItem])){
                this.setState({
                    [historyItem]: [],
                })
            } else {
                this.setState({
                    [historyItem]: '',
                })
            }
        }
        this.setState({
            mainTasksInput: '',
        })
    }

    updateHistory(event){
        event.preventDefault()
        const {companyName, position, workStart, workEnd, mainTasksArray} = this.state
        const workData = {companyName, position, workStart, workEnd, mainTasksArray}
        //Sends the data to the overarching form
        this.props.updateHistory(workData)
        this.resetInputFields(workData)
    }

    handleMainTaskEdit(index){
        this.setState((state) => {
            return {
                mainTasksBeingEdited: true,
                mainTaskEdit: state.mainTasksArray[index],
                mainTaskEditIndex: index,
            }
        })
    }

    editMainTask(event){
        event.preventDefault()
        this.setState((state) => {
                return {
                    mainTasksArray: state.mainTasksArray.map((mainTask, index) => {
                        if(state.mainTaskEditIndex === index){
                            return state.mainTaskEdit
                        } else {
                            return mainTask
                        }
                    }),
                    mainTasksBeingEdited: false,
                }
        })
    }

    removeMainTask(targetIndex){
        this.setState((state) => {
            return {
                mainTasksArray: state.mainTasksArray.filter((mainTask, index) => {
                    return index !== targetIndex
                })
            }
        })
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

        const {mainTasksInput, mainTasksArray, mainTaskEdit, mainTasksBeingEdited} = this.state

        //conditionally render mainTasksEditField
        let mainTasksEditField = null
        if(mainTasksBeingEdited){
            mainTasksEditField 
            = <FormControl additionalStyling='mainTaskControl' name='mainTaskEdit' 
            label='' value={mainTaskEdit} updateForm={this.updateForm}>
                <button className='input-button' onClick={this.editMainTask}>Edit Main Task</button>
            </FormControl>
        }
        
        //conditionally render mainTasksArray
        let mainTasksContainer = null
        if(mainTasksArray.length > 0){
            mainTasksContainer = <div className='main-tasks-container'>
                <h4>Main Tasks</h4>
                {mainTasksEditField}
                <ul>
                    <MainTasksDisplay 
                    mainTasksArray={mainTasksArray}
                    requestEdit={this.handleMainTaskEdit}
                    removeFromHistory={this.removeMainTask}/>
                </ul>
            </div>
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
                    <button className='input-button' onClick={this.addMainTask}>Add Main Task</button>
                </FormControl>
                {mainTasksContainer}
                <button className="input-button work-exp-input-button" 
                onClick={this.updateHistory}>{buttonPurpose}</button>
            </InputSection>
        )
    }
}

export default WorkExpInput 