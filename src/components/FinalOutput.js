import React from 'react'
import HistoryContainer from './HistoryContainer'
import '../styles/final-output.css'

class FinalOutput extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {firstName, lastName, email, phoneNumber, aboutMe} = this.props
        const {eduHistoryContainer, workHistoryContainer} = this.props
        return (
            <div className="cv">
                <div className="cv-contact-information">
                    <h2>Personal Information</h2>
                    <p>{firstName+' '+lastName}</p>
                    <p>{email}</p>
                    <p>{phoneNumber}</p>
                </div>
                <div className="cv-main-information">
                    <HistoryContainer title='About Me'>
                        <p>{aboutMe}</p>
                    </HistoryContainer>
                    {eduHistoryContainer}
                    {workHistoryContainer}
                </div>
            </div>
        )
    }
}

export default FinalOutput