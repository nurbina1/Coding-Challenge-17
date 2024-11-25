import React, { useState, useEffect } from 'react';
import './Gallery.css';

// Main component to display the list of tours
const Gallery = () => {
    // State to hold tours, loading status, and errors
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch tour data when the component is mounted
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch('https://course-api.com/react-tours-project');
                if (!response.ok) throw new Error('Could not fetch the tours. Please try again later.');
                const data = await response.json();
                setTours(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    // Function to remove a tour from the list
    const handleRemoveTour = (id) => {
        setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
    };

    // Loading state
    if (loading) {
        return <p className="loading">Loading tours...</p>;
    }

    // Error state
    if (error) {
        return <p className="error">{error}</p>;
    }

    // If there are no tours left to display
    if (tours.length === 0) {
        return (
            <div className="no-tours">
                <h2>No tours available!</h2>
                <button onClick={() => window.location.reload()}>Reload Tours</button>
            </div>
        );
    }

    return (
        <div className="gallery">
            {tours.map((tour) => {
                const { id, name, info, image, price } = tour;
                const [showFullInfo, setShowFullInfo] = useState(false);

                return (
                    <div key={id} className="tour-card">
                        {/* Tour Image */}
                        <img src={image} alt={name} className="tour-image" />

                        {/* Tour Details */}
                        <div className="tour-details">
                            <h2>{name}</h2>
                            <h4 className="tour-price">${price}</h4>
                            <p className="tour-info">
                                {showFullInfo ? info : `${info.substring(0, 100)}...`}
                                <button
                                    className="toggle-info-btn"
                                    onClick={() => setShowFullInfo(!showFullInfo)}
                                >
                                    {showFullInfo ? 'Show Less' : 'Read More'}
                                </button>
                            </p>
                            <button
                                className="remove-tour-btn"
                                onClick={() => handleRemoveTour(id)}
                            >
                                Not Interested
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Gallery;
