import React from 'react'

class FormControl extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        const {name, value} = event.target
        this.props.updateForm(name, value)
    }

    render(){
        const {name, label, type, value} = this.props
        if(type === null){
            type = 'text'
        }
        return(
            <div className="form-control">
                <label htmlFor={name}>{label}</label>
                <input type={type} id={name} name={name}
                onChange={this.handleChange}
                value={value}/>
            </div>
        )
    }
}

export default FormControl