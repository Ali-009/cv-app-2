import React from 'react'

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
                <div className='cv-about-me'>
                    <h2>About Me</h2>
                    <p>{aboutMe}</p>
                </div>
                {eduHistoryContainer}
                {workHistoryContainer}
            </div>
        )
    }
}

export default FinalOutput