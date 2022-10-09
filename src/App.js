import React from 'react';
import PersonalInfoInput from './components/PersonalInfoInput';
import EducationInput from './components/EducationInput';
import WorkExpInput from './components/WorkExpInput';
import HistoryContainer from './components/HistoryContainer';
import EduHistoryItem from './components/EduHistoryItem';
import WorkHistoryItem from './components/WorkHistoryItem';

import uniqid from 'uniqid'
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
      eduBeingEdited: false,
      eduEditIndex: null,
      companyName: '',
      position: '',
      workStart: '',
      workEnd: '',
      mainTasksInput: '',
      mainTasksArray: [],
      workHistory: [],
      workBeingEdited: false,
      workEditIndex: null,
    }
    
    //Used to create React Controlled Inputs
    this.updateForm = this.updateForm.bind(this)
    
    //Used to add an item to a history array
    this.addHistory = this.addHistory.bind(this)
    this.addEduHistory = this.addEduHistory.bind(this)
    this.addWorkHistory = this.addWorkHistory.bind(this)
    
    //Used for editing history arrays
    this.editHistory = this.editHistory.bind(this)
    this.editEduHistory = this.editEduHistory.bind(this)
    this.editWorkHistory = this.editWorkHistory.bind(this)

    this.handleEduEditRequest = this.handleEduEditRequest.bind(this)
    this.handleWorkEditRequest = this.handleWorkEditRequest.bind(this)
  }
  
  updateForm(name, value){
    this.setState({
      [name] : value
    })
  }

  //A generic function that is used for adding both education and work experience history
  addHistory(historyObj, historyArray){
    const updatedHistory = historyArray.concat({
      ...historyObj,
    })
    return updatedHistory
  }

  addEduHistory(eduData){
    this.setState((state) => {
      return {
        eduHistory: this.addHistory(eduData, state.eduHistory)
      }
    })
  }

  addWorkHistory(workData){
    this.setState((state) => {
      return {
        workHistory: this.addHistory(workData, state.workHistory)
      }
    })
  }

  //A generic function for editing history
  editHistory(historyArray, sourceObj, targetObj, currentEditIndex){
    const updatedHistory = historyArray.map((historyElement, index) => {
      if(currentEditIndex === index){
        for(const property in targetObj){
          if(Array.isArray(targetObj[property])){
            //This creates a deep copy of an array
            for(let i = 0; i < sourceObj[property].length; i++){
              targetObj[property][i] = sourceObj[property][i]
            }
          } else {
            targetObj[property] = sourceObj[property]
          }
           
        }
        return targetObj
      } else {
        return historyElement
      }
    })
    return updatedHistory
  }

  editEduHistory(eduData, index){
    this.setState((state) => {
        let targetObj = {
          school: '',
          studyTitle: '',
          eduStart: '',
          eduEnd: '',
        }
        return {
          eduHistory: this.editHistory(state.eduHistory, eduData, targetObj, index),
          eduEditIndex: null
        }
    })
  }

  editWorkHistory(workData, index){
    this.setState((state) => {
      let targetObj = {
        companyName: '',
        position: '',
        workStart: '',
        workEnd: '',
        mainTasksArray: [],
      }
      return {
        workHistory: this.editHistory(state.workHistory, workData, targetObj, index),
        workEditIndex: null
      }
    })
  }

  handleEduEditRequest(index){
    this.setState({
      eduEditIndex: index
    })
  }

  handleWorkEditRequest(index){
    this.setState({
      workEditIndex: index
    })
  }

  render(){
    const {firstName, lastName, email, phoneNumber} = this.state
    const {eduHistory, eduEditIndex} = this.state
    const {workHistory, workEditIndex} = this.state

    //conditionally render the education history container
    let eduHistoryContainer = null
    if(eduHistory.length > 0){
      eduHistoryContainer 
      = <HistoryContainer title='Education History'>
          <ul>
            {eduHistory.map((eduHistoryElement, index) => {
              let beingEdited = false
              if(eduEditIndex === index){
                beingEdited = true
              } return (
                <EduHistoryItem key={uniqid()} 
                eduData={eduHistoryElement}
                eduHistoryIndex={index}
                requestEdit={this.handleEduEditRequest}
                beingEdited={beingEdited}
                editHistory={this.editEduHistory}/>
              )
            })}
          </ul>
      </HistoryContainer>
    }

    //conditionally render the work history container
    let workHistoryContainer = null
    if(workHistory.length > 0){
      workHistoryContainer 
      = <HistoryContainer title='Work History'>
        <ul>
          {workHistory.map((workHistoryElement, index) => {
            let beingEdited = null
            if(workEditIndex === index){
              beingEdited = true
            } return (
              <WorkHistoryItem key={uniqid()}
              workData={workHistoryElement}
              workHistoryIndex={index}
              requestEdit={this.handleWorkEditRequest}
              beingEdited={beingEdited}
              editHistory={this.editWorkHistory}/>
            )
          })}
        </ul>
      </HistoryContainer>
    }

    return (
      <div className="app-container">
          <h1>CV Application</h1>  
          <form action="#">
            <PersonalInfoInput firstName={firstName} lastName={lastName}
            email={email} phoneNumber={phoneNumber} updateForm={this.updateForm}/>

            {eduHistoryContainer}
            <EducationInput header='Education' buttonPurpose='Add' updateHistory={this.addEduHistory}/>

            {workHistoryContainer}
            <WorkExpInput header='Work Experience'
            buttonPurpose='Add' updateHistory={this.addWorkHistory}/>
          </form>
      </div>
    )
  }
}

export default App;
