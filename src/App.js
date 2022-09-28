
import React from 'react';
import PersonalInfoInput from './components/PersonalInfoInput';
import EducationInput from './components/EducationInput';
import './styles/app-style.css'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      school: '',
      studyTitle: '',
      eduStart: '',
      eduEnd: '',
    }
    this.updateForm = this.updateForm.bind(this)
  }
  
  updateForm(name, value){
    this.setState({
      [name] : value
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
          eduStart={eduStart} eduEnd={eduEnd} updateForm={this.updateForm} />
        </form>
    </div>
    )
  }
}

export default App;
