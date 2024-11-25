import React from 'react';
import Gallery from 'Gallery';
import 'App.css';

// Root component of the application
const App = () => {
    return (
        <div className="app">
            <header>
                <h1>Explore Amazing Tours</h1>
            </header>
            {/* Render the Gallery component */}
            <Gallery />
        </div>
    );
};

export default App;
