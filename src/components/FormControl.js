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
        const {name, label, type, value, children, additionalStyling} = this.props
        if(type === null){
            type = 'text'
        }
        let additionalClasses = ''
        if(additionalStyling){
            additionalClasses = additionalStyling
        }
        return(
            <div className={'form-control '+additionalClasses}>
                <label htmlFor={name}>{label}</label>
                <input type={type} id={name} name={name}
                onChange={this.handleChange}
                value={value}/>
                {children}
            </div>
        )
    }
}

export default FormControl