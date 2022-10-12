import React from 'react'
import '../styles/final-output.css'
import uniqid from 'uniqid'

class FinalOutput extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {firstName, lastName, email, phoneNumber, aboutMe} = this.props
        const {eduHistory, workHistory, backButton} = this.props

        //conditionally traverse the arrays eduHistory and workHistory
        let eduHistoyDisplay = null
        if(eduHistory.length > 0){
            eduHistoyDisplay
            = <div className="edu-history-display">
                <h2>Education</h2>
                <ul>
                    {eduHistory.map((eduItem) => {
                        const {school, studyTitle, eduStart, eduEnd} = eduItem
                        const formattedStartDate = new Date(eduStart).toLocaleDateString('en-GB')
                        const formattedEndDate = new Date(eduEnd).toLocaleDateString('en-GB')
                        return <li key={uniqid()}>Studied {studyTitle} in {school}, from {formattedStartDate} to {formattedEndDate}</li>
                    })}
                </ul>
            </div>
        }

        let workHistoryDisplay = null
        if(workHistory.length > 0){
            workHistoryDisplay
            = <div className="work-history-display">
                <h2>Work Experience</h2>
                <ul>
                    {workHistory.map((workItem) => {
                        const {companyName, position, workStart, workEnd, mainTasksArray} = workItem
                        const formattedStartDate = new Date(workStart).toLocaleDateString('en-GB')
                        const formattedEndDate = new Date(workEnd).toLocaleDateString('en-GB')
                        return <li className='work-item' key={uniqid()}>Worked at {companyName} as {position}, from {formattedStartDate} to {formattedEndDate}.
                        
                            <ul>
                                <h3>Main Tasks</h3>
                                {mainTasksArray.map((mainTask) => {
                                    return <li key={uniqid()}>{mainTask}</li>
                                })}
                            </ul>
                        </li>
                    })}
                </ul>
            </div>
        }

        return (
            <div className="cv">
                <div className="cv-contact-information">
                    <p className='cv-contact-information-name'>{firstName+' '+lastName}</p>
                    <p>{email}</p>
                    <p>{phoneNumber}</p>
                </div>
                <div className="cv-main-information">
                    <div className="about-me">
                        <h2>About Me</h2>
                        <p>{aboutMe}</p>
                    </div>
                    {eduHistoyDisplay}
                    {workHistoryDisplay}
                    {backButton}
                </div>
            </div>
        )
    }
}

export default FinalOutput