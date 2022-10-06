
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
      workHistoryEdit: false,
      companyNameEdit: '',
      positionEdit: '',
      workStartEdit: '',
      workEndEdit: '',
      mainTasksInputEdit: '',
      mainTasksArrayEdit: [],
      workEditIndex: 0,
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
    this.updateEditSection = this.updateEditSection.bind(this)
    
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

    //Used for main tasks within the work experience section
    this.updateMainTasks = this.updateMainTasks.bind(this)
    this.updateMainTasksEdit = this.updateMainTasksEdit.bind(this)
    this.editMainTasksRequest = this.editMainTasksRequest.bind(this)
    this.editMainTasks = this.editMainTasks.bind(this)
    this.editMainTasksEditRequest = this.editMainTasksEditRequest.bind(this)
    this.editMainTasksEdit = this.editMainTasksEdit.bind(this)

    //funcations after simplifying code
    this.handleEduEditRequest = this.handleEduEditRequest.bind(this)
  }
  
  updateForm(name, value){
    this.setState({
      [name] : value
    })
  }

  //Controlled inputs for edit sections of the form
  //To the section components, both forms of updating the form are identical and are referenced using this.props.updateForm
  //The state member variables for editing are named similar to the ones in MainForm and only have 'Edit' at the end of their key
  //The function below is also reusable for editing experience section
  updateEditSection(key, value){
    this.setState({
        [key + 'Edit']: value,
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

  addWorkHistory(){
    this.setState((state) => {
      const {companyName, position, workStart, workEnd, mainTasksArray, workHistory} = state
      const workData = {companyName, position, workStart, mainTasksArray, workEnd}
      return{
        workHistory: this.addHistory(workData, workHistory)
      }
    })

    const {companyName, position, workStart, workEnd, mainTasksInput, mainTasksArray} = this.state
    const workData = {companyName, position, workStart, mainTasksInput, mainTasksArray, workEnd}
    this.resetInputFields(workData)
    this.setState({
      mainTasksEdit: false,
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

  updateMainTasks(){
    this.setState((state) => {
      return {
        mainTasksArray: state.mainTasksArray.concat(state.mainTasksInput)
      }
    })
  }

  updateMainTasksEdit(){
    this.setState((state) => {
      return {
        mainTasksArrayEdit: state.mainTasksArrayEdit.concat(state.mainTasksInputEdit)
      }
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
    const {companyName, position, workStart, workEnd, workHistory, workHistoryEdit} = this.state
    const {mainTasksInput, mainTasksArray} = this.state
    const {mainTasksEdit, mainTasksEditInput} = this.state

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


    //conditionally rendering the work experience edit section
    let workEditSection = null;
    if(workHistoryEdit){
      const {companyNameEdit, positionEdit, workStartEdit, workEndEdit, mainTasksArrayEdit} = this.state
      const {mainTasksEditEdit, mainTasksEditInputEdit, mainTasksEditIndexEdit} = this.state

      workEditSection 
      = <WorkExpInput header='Edit Work Experience'
      buttonPurpose='Edit' companyName={companyNameEdit} position={positionEdit}
      workStart={workStartEdit} workEnd={workEndEdit} mainTasksArray={mainTasksArrayEdit}
      updateForm={this.updateEditSection}
      updateMainTasks={this.updateMainTasksEdit}
      updateWorkHistory={this.editWorkHistory}
      editMainTasksRequest={this.editMainTasksEditRequest}
      mainTasksEdit={mainTasksEditEdit} mainTasksEditInput={mainTasksEditInputEdit} 
      mainTasksEditIndex={mainTasksEditIndexEdit}
      editMainTasks={this.editMainTasksEdit}/>
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
            {workEditSection}
            <WorkExpInput header='Work Experience' companyName={companyName} position={position}
            workStart={workStart} workEnd={workEnd} mainTasksInput={mainTasksInput} updateForm={this.updateForm} 
            buttonPurpose='Add' updateWorkHistory={this.addWorkHistory} updateMainTasks={this.updateMainTasks}
            mainTasksArray={mainTasksArray} editMainTasksRequest={this.editMainTasksRequest}
            mainTasksEdit={mainTasksEdit} mainTasksEditInput={mainTasksEditInput}
            editMainTasks={this.editMainTasks}/>
          </form>
      </div>
    )
  }
}

export default App;
