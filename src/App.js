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
      //below are state variables used for editing main tasks
      mainTasksEdit: false,
      mainTasksEditInput: '',
      mainTasksEditIndex: '',
      //Editing the main tasks within a work experience section being edited
      mainTasksEditEdit: false,
      mainTasksEditInputEdit: '',
      mainTasksEditIndex: '',
    }
    
    //Used to create React Controlled Inputs
    this.updateForm = this.updateForm.bind(this)
    
    //Used to add an item to a history array
    this.addHistory = this.addHistory.bind(this)
    this.addEduHistory = this.addEduHistory.bind(this)
    this.addWorkHistory = this.addWorkHistory.bind(this)
    //reset input fields after the items have been added
    this.resetInputFields = this.resetInputFields.bind(this)
    
    //Used for editing history arrays
    this.editHistory = this.editHistory.bind(this)
    this.editWorkHistoryRequest = this.editWorkHistoryRequest.bind(this)
    this.editEduHistory = this.editEduHistory.bind(this)
    this.editWorkHistory = this.editWorkHistory.bind(this)

    //funcations after simplifying code
    this.handleEduEditRequest = this.handleEduEditRequest.bind(this)
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

  resetInputFields(historyObj){
    //Reset the fields after the items have been added to history
    for(const historyItem in historyObj){
      if(historyItem === 'mainTasksArray'){
        this.setState({
          mainTasksArray: [],
        })
      } else {
        this.setState({
          [historyItem]: '',
        })
      }
    }
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

  editWorkHistoryRequest(elementData, index){
    const {companyName, position, workStart, workEnd, mainTasksArray} = elementData
    this.setState({
      workHistoryEdit: true,
      companyNameEdit: companyName,
      positionEdit: position,
      workStartEdit: workStart,
      workEndEdit: workEnd,
      mainTasksArrayEdit: mainTasksArray,
      workEditIndex: index,
    })
  }

  editMainTasksRequest(mainTask, index){
    this.setState({
      mainTasksEdit: true,
      mainTasksEditInput: mainTask,
      mainTasksEditIndex: index,
    })
  }

  editMainTasksEditRequest(mainTask, index){
    this.setState({
      mainTasksEditEdit: true,
      mainTasksEditInputEdit: mainTask,
      mainTasksEditIndexEdit: index,
    })
  }

  //edits the array of MainTasks as part of the main form
  editMainTasks(){
    this.setState((state) => {
      const updatedMainTasksArray = state.mainTasksArray.map((mainTask, index) => {
        if(index === state.mainTasksEditIndex){
          return state.mainTasksEditInput
        } else {
          return mainTask
        }
      })
      return {
        mainTasksArray: updatedMainTasksArray,
      }
    })
    this.setState({
      mainTasksEdit: false
    })
  }

  editMainTasksEdit(){
    this.setState((state) => {
      const updatedMainTasksArray = state.mainTasksArrayEdit.map((mainTask, index) => {
        if(index === state.mainTasksEditIndexEdit){
          return state.mainTasksEditInputEdit
        } else {
          return mainTask
        }
      })
      return {
        mainTasksArrayEdit: updatedMainTasksArray,
      }
    })
    this.setState({
      mainTasksEditEdit: false
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

  editWorkHistory(){
    this.setState((state => {
      const {companyNameEdit, positionEdit, workStartEdit, workEndEdit, mainTasksArrayEdit} = state
      const {workHistory, workEditIndex} = state
      const editSource = {companyNameEdit, positionEdit, workStartEdit, workEndEdit, mainTasksArrayEdit}
      let editTarget = {
        companyName: '',
        position: '',
        workStart: '',
        workEnd: '',
        mainTasksArray: [],
      }

      return{
        workHistory: this.editHistory(workHistory, editSource, editTarget, workEditIndex),
        workHistoryEdit: false
      }
    }))
    this.setState({
      mainTasksEditEdit: false
    })
  }

  handleEduEditRequest(index){
    this.setState({
      eduEditIndex: index
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
            return (
              <WorkHistoryItem key={uniqid()}
              workHistoryElement={workHistoryElement}
              workHistoryElementIndex={index}
              editWorkHistoryRequest={this.editWorkHistoryRequest}
              editHistory={this.editEduHistory}/>
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
