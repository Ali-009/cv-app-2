import React from 'react'
import FormControl from './FormControl'
import InputSection from './InputSection'

class EducationInput extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {school, studyTitle, eduStart, eduEnd, updateForm} = this.props
        return (
            <InputSection title='Education'>
                <FormControl name='school' label='School'
                value={school} updateForm={updateForm}/>
                <FormControl name='studyTitle' label='Title of Study'
                value={studyTitle} updateForm={updateForm}/>
                <FormControl name='eduStart' label='From' type='date'
                value={eduStart} updateForm={updateForm} />
                <FormControl name='eduEnd' label='To' type='date'
                value={eduEnd} updateForm={updateForm} />
            </InputSection>
        )
    }
}

export default EducationInput