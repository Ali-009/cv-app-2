
import React from 'react';
import InputSection from './components/InputSection'
import FormControl from './components/FormControl';
import './styles/app-style.css'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
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
    return (
    <div className="app-container">
        <h1>CV Application</h1>  
        <form action="#">
          <InputSection title='Personal Information'>
            <FormControl name='firstName' label='First Name'
            value={firstName} updateForm={this.updateForm}/>
            <FormControl name='lastName' label='Last Name'
            value={lastName} updateForm={this.updateForm}/>
            <FormControl name='email' label='Email' type='email'
            value={email} updateForm={this.updateForm} />
            <FormControl name='phoneNumber' label='Phone Number' type='tel'
            value={phoneNumber} updateForm={this.updateForm} />
          </InputSection>
        </form>
    </div>
    )
  }
}

export default App;
