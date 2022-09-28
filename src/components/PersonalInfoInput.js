import React from 'react'
import InputSection from './InputSection'
import FormControl from './FormControl'

class PersonalInfoInput extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {firstName, lastName, email, phoneNumber, updateForm} = this.props
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
        </InputSection>
        )
    }
}

export default PersonalInfoInput 