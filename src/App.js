import React from 'react';
import PersonalInfoInput from './components/PersonalInfoInput';
import EducationInput from './components/EducationInput';
import WorkExpInput from './components/WorkExpInput';
import HistoryContainer from './components/HistoryContainer';
import EduHistoryItem from './components/EduHistoryItem';
import WorkHistoryItem from './components/WorkHistoryItem';
import FinalOutput from './components/FinalOutput'

import uniqid from 'uniqid'
import './styles/app-style.css'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      aboutMe: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius quibusdam unde eos nihil magnam itaque, cupiditate veniam voluptatum, tenetur at sunt ea voluptatibus? Incidunt omnis eos distinctio modi exercitationem minima tempore quas eum, aliquam repellat voluptas facilis optio libero. Atque modi pariatur sunt voluptatum aliquid ex necessitatibus quas, incidunt dignissimos velit itaque aliquam magnam. Libero delectus suscipit, sequi provident qui quasi explicabo necessitatibus quis ea quae saepe beatae deleniti perspiciatis, consectetur doloribus dolorum ullam repellendus aspernatur, placeat porro nostrum debitis esse itaque voluptatibus? Inventore eveniet cumque vero dolor incidunt corrupti amet eligendi provident quidem, nam facilis voluptatibus temporibus similique omnis?',
      phoneNumber: '(555) 47432 345',
      eduHistory: [{
        school: 'Sharjah Private School',
        studyTitle: 'High School',
        eduStart: '2005-05-01',
        eduEnd: '2010-05-01',
      },
      {
        school: 'Dubai University',
        studyTitle: 'Computer Science',
        eduStart: '2011-09-01',
        eduEnd: '2015-09-01',
      }],
      eduBeingEdited: false,
      eduEditIndex: null,
      workHistory: [{
        companyName: 'Microsoft',
        position: 'Web Dev Intern',
        workStart: '2017-09-05',
        workEnd: '2018-10-05',
        mainTasksArray: [
          'Implementing Designs on the front-end',
          'Coordinating between front-end and back-end teams',
          'Testing server databases',
        ],
      },
      {
        companyName: 'Google',
        position: 'Junior Front-end Web Developer',
        workStart: '2018-12-01',
        workEnd: '2020-12-05',
        mainTasksArray: [
          'Assisting in the design of websites',
          'Applyign fundamental UI/UX principles to websites',
          'Ensuring webpages adhere to accessibility guidelines',
          'Testing for cross-browser compatibility of webpages',
        ],
      }],
      workBeingEdited: false,
      workEditIndex: null,
      formSubmitted: false,
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

    //Used for generating editing sections
    this.handleEduEditRequest = this.handleEduEditRequest.bind(this)
    this.handleWorkEditRequest = this.handleWorkEditRequest.bind(this)

    //Used for removing items from history
    this.removeEduHistoryItem = this.removeEduHistoryItem.bind(this)
    this.removeWorkHistoryItem = this.removeWorkHistoryItem.bind(this)

    //Form submission functions
    this.submitForm = this.submitForm.bind(this)
    this.displayForm = this.displayForm.bind(this)
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

  removeEduHistoryItem(targetIndex){
    this.setState((state) => {
      return {
        eduHistory: state.eduHistory.filter((historyItem, index) => {
          return index !== targetIndex
        })
      }
    })
  }

  removeWorkHistoryItem(targetIndex){
    this.setState((state) => {
      return {
        workHistory: state.workHistory.filter((historyItem, index) => {
          return index !== targetIndex
        })
      }
    })
  }

  submitForm(event){
    event.preventDefault()
    this.setState({
      formSubmitted: true,
    })
  }

  displayForm(event){
    event.preventDefault()
    this.setState({
      formSubmitted: false,
    })
  }

  render(){
    const {firstName, lastName, email, aboutMe, phoneNumber} = this.state
    const {eduHistory, eduEditIndex} = this.state
    const {workHistory, workEditIndex} = this.state
    const {formSubmitted} = this.state

    //conditionally render the education history container
    let eduHistoryContainer = null
    if(eduHistory.length > 0){
      eduHistoryContainer 
      = <HistoryContainer title='Education'>
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
                editHistory={this.editEduHistory}
                removeFromHistory={this.removeEduHistoryItem}/>
              )
            })}
          </ul>
      </HistoryContainer>
    }

    //conditionally render the work history container
    let workHistoryContainer = null
    if(workHistory.length > 0){
      workHistoryContainer 
      = <HistoryContainer title='Work Experience'>
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
              editHistory={this.editWorkHistory}
              removeFromHistory={this.removeWorkHistoryItem}/>
            )
          })}
        </ul>
      </HistoryContainer>
    }

    //The 'back' button is passed down to the final output for stylign purposes
    let backButton = 
    <button className='input-button back-button' onClick={this.displayForm}>Back</button>

    //display input fields or the final submitted form based on user interaction
    let pageDisplay = null
    if(!formSubmitted){
      pageDisplay
      = <div className="app-container">
          <h1>CV Application</h1>  
          <form action="#">
            <PersonalInfoInput firstName={firstName} lastName={lastName}
            email={email} phoneNumber={phoneNumber} aboutMe={aboutMe} updateForm={this.updateForm}/>

            {eduHistoryContainer}
            <EducationInput header='Education' buttonPurpose='Add' updateHistory={this.addEduHistory}/>

            {workHistoryContainer}
            <WorkExpInput header='Work Experience'
            buttonPurpose='Add' updateHistory={this.addWorkHistory}/>
            <button className='input-button submit-button' onClick={this.submitForm}>Submit CV</button>
          </form>
      </div>
    } else {
      pageDisplay
      = <div className="app-container">
        <FinalOutput firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} aboutMe={aboutMe}
        eduHistory={eduHistory} workHistory={workHistory} backButton={backButton}/>
      </div>
    }

    return pageDisplay
  }
}

export default App;
