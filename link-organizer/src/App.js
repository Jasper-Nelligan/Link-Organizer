import React from 'react';

class App extends React.Component {
    render () {
        return (
            <>
            <h1 className="center">Course Link Organizer</h1>
            <h3 className="center">All your class links - One page</h3>
            <div className="btn-container">
                <button id="add-course-btn">Add course</button>
            </div>
            <p id="footer">
                Questions, issues, or suggestions? Open an issue on 
                <a href="https://github.com/Jasper-Nelligan/Link-Organizer" target="_blank"> github </a>
                or email me at jnelligan@protonmail.com</p>
            </>
        )
    }
}

export default App;