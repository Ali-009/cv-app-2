import React from 'react'
import InputSection from './InputSection'
import FormControl from './FormControl'

class PersonalInfoInput extends React.Component{
    constructor(props){
        super(props)
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    }

    handleTextAreaChange(event){
        const {name, value} = event.target
        this.props.updateForm(name,value)
    }

    render(){
        const {firstName, lastName, email, phoneNumber, aboutMe, updateForm} = this.props
        return(
        <InputSection title='Personal Information'>
            <FormControl name='firstName' label='First Name'
            value={firstName} updateForm={updateForm}/>
            <FormControl name='lastName' label='Last Name'
            value={lastName} updateForm={updateForm}/>
            <FormControl name='email' label='Email' type='email'
            value={email} updateForm={updateForm} />
            <FormControl name='phoneNumber' label='Phone Number' type='tel'
            value={phoneNumber} updateForm={updateForm} />
            <div className='form-control textarea'>
                <label htmlFor='aboutMe'>About Me</label>
                <textarea name='aboutMe' id='aboutMe' cols="30" rows="5"
                value={aboutMe} onChange={this.handleTextAreaChange}/>
            </div>
        </InputSection>
        )
    }
}

export default PersonalInfoInput 