import React from 'react'
import FormControl from './FormControl'
import InputSection from './InputSection'

class EducationInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            school: '',
            studyTitle: '',
            eduStart: '',
            eduEnd: '',
        }
        this.updateForm = this.updateForm.bind(this)
        this.updateHistory = this.updateHistory.bind(this)
        this.resetInputFields = this.resetInputFields.bind(this)
    }

    updateForm(name, value){
        this.setState({
          [name] : value
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
        const {school, studyTitle, eduStart, eduEnd} = this.state
        const eduData = {school, studyTitle, eduStart, eduEnd}
        //Sends the data to the overarching form
        this.props.updateHistory(eduData)
        this.resetInputFields(eduData)
    }

    componentDidMount(){
        //If education data has been received, display it as values for the form controls
        //This happens when the data is being edited
        const {eduData} = this.props
        if(eduData){
            const {school, studyTitle, eduStart, eduEnd} = eduData
            this.setState({
                school,
                studyTitle,
                eduStart,
                eduEnd
            })
        }
    }

    render(){
        const {header, buttonPurpose} = this.props 
        const {school, studyTitle, eduStart, eduEnd} = this.state
        return (
            <InputSection title={header}>
                <FormControl name='school' label='School'
                value={school} updateForm={this.updateForm}/>
                <FormControl name='studyTitle' label='Title of Study'
                value={studyTitle} updateForm={this.updateForm}/>
                <FormControl name='eduStart' label='From' type='date'
                value={eduStart} updateForm={this.updateForm} />
                <FormControl name='eduEnd' label='To' type='date'
                value={eduEnd} updateForm={this.updateForm} />
                <button className="input-button" 
                onClick={this.updateHistory}>{buttonPurpose}</button>
            </InputSection>
        )
    }
}

export default EducationInput