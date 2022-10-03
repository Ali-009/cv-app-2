import React from 'react'
import FormControl from './FormControl'
import InputSection from './InputSection'

class EducationInput extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event){
        event.preventDefault()
        this.props.updateEduHistory()
    }

    render(){
        const {header, school, studyTitle, eduStart, eduEnd, updateForm, buttonPurpose} = this.props
        return (
            <InputSection title={header}>
                <FormControl name='school' label='School'
                value={school} updateForm={updateForm}/>
                <FormControl name='studyTitle' label='Title of Study'
                value={studyTitle} updateForm={updateForm}/>
                <FormControl name='eduStart' label='From' type='date'
                value={eduStart} updateForm={updateForm} />
                <FormControl name='eduEnd' label='To' type='date'
                value={eduEnd} updateForm={updateForm} />
                <button className="input-button" 
                onClick={this.handleClick}>{buttonPurpose}</button>
            </InputSection>
        )
    }
}

export default EducationInput