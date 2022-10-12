import React from 'react'

class HistoryContainer extends React.Component{
    render(){
        const {title, children} = this.props
        return (
            <div className="history-container">
                <h3>{title}</h3>
                {children}
            </div>
        )
    }
}

export default HistoryContainer