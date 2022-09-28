import React from 'react'
import '../styles/section-style.css'

class InputSection extends React.Component{
    render(){
        const {title, children} = this.props
        return (
            <fieldset>
                <div className="section-container">
                    <legend>{title}</legend>
                    {children}
                </div>
            </fieldset>
        )
    }
}

export default InputSection