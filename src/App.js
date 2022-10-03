
import React from 'react';
import PersonalInfoInput from './components/PersonalInfoInput';
import EducationInput from './components/EducationInput';
import './styles/app-style.css'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      school: '',
      studyTitle: '',
      eduStart: '',
      eduEnd: '',
      eduHistory: [],
    }
    this.updateForm = this.updateForm.bind(this)
    this.addEduHistory = this.addEduHistory.bind(this)
  }
  
  updateForm(name, value){
    this.setState({
      [name] : value
    })
  }

  //A generic function that is used for adding both education and work experience history
  addHistory(data, historyArray){
    const updatedHistory = historyArray.concat({
      ...data,
    })
    return updatedHistory
  }

  addEduHistory(){
    this.setState((state) => {
      const {school, studyTitle, eduStart, eduEnd, eduHistory} = state
      const eduData = {school, studyTitle, eduStart, eduEnd}
      return {
        eduHistory: this.addHistory(eduData, eduHistory)
      }
    })
  }

  render(){
    const {firstName, lastName, email, phoneNumber} = this.state
    const {school, studyTitle, eduStart, eduEnd} = this.state
    return (
    <div className="app-container">
        <h1>CV Application</h1>  
        <form action="#">
          <PersonalInfoInput firstName={firstName} lastName={lastName}
          email={email} phoneNumber={phoneNumber} updateForm={this.updateForm}/>
          <EducationInput school={school} studyTitle={studyTitle} 
          eduStart={eduStart} eduEnd={eduEnd} updateForm={this.updateForm} 
          buttonPurpose='Add' addEduHistory={this.addEduHistory}/>
        </form>
    </div>
    )
  }
}

export default App;
