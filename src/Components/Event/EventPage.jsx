import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../../backend/supabaseClient'; 
import { useAuth } from '../Login_SignUp/Auth';
import './EventPage.css';



const bucketBaseUrl = 'https://gliujspizqdmlzvnkyfb.supabase.co/storage/v1/object/public/Planify/Event/';

const EventPage = () => {
    const { id } = useParams(); // Get event ID from URL
    const { authData } = useAuth(); // Get user authentication data
    const [event, setEvent] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [showLoginPopup, setShowLoginPopup] = useState(false); // State for login popup

    useEffect(() => {
        // Fetch event details and reviews when the component loads
        fetchEvent();
        fetchReviews();
    }, [id]);

    const fetchEvent = async () => {
        const { data, error } = await supabase
            .from('EventTable')
            .select('*')
            .eq('event_id', id)
            .single();

        if (error) {
            console.error('Error fetching event:', error);
        } else {
            setEvent(data);
        }
    };

    const fetchReviews = async () => {
        const { data, error } = await supabase
            .from('Review') // Replace 'Review' with your table name
            .select('*')
            .eq('event_id', id); // Fetch reviews for the specific event

        if (error) {
            console.error('Error fetching reviews:', error);
        } else {
            setReviews(data);
        }
    };

    const handleReviewChange = (e) => {
        setNewReview(e.target.value);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        
        if (!authData) {
            setShowLoginPopup(true); 
            return;
        }

        if (newReview.trim()) {
            const { data, error } = await supabase
                .from('Review') 
                .insert([
                    {
                        event_id: id, 
                        created_at: new Date().toISOString(), 
                        user_id: authData.id, 
                        review_txt: newReview,
                    },
                ])
                .select();

            if (error) {
                console.error('Error saving review:', error);
            } else {
             
                setReviews([...reviews, ...data]);
                setNewReview('');
            }
        }
    };

    const handleBuyTickets = () => {
        alert('Purchased tickets.');
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="event-page-container">
            <div className="event-header-image-container">
                <img 
                    src={`${bucketBaseUrl}event_${id}.png`}
                    alt="eventBanner" 
                    className="event-header-image" 
                />
            </div>

            <div className="event-content-container">
                <div className="event-page-box">
                    <div className="event-name-header">
                        <h3>Event Title</h3>
                        <div className="event-underline"></div>
                        <p style={{ marginBottom: '20px' }}>{event.event_title}</p>
                    </div>

                    <div className="event-date-box">
                        <h3>Date and Time</h3>
                        <div className="event-underline"></div>
                        <p style={{ marginBottom: '20px' }}>
                           {new Date(event.date).toISOString().slice(0, 10).replace("T", " ")}
                        </p>
                    </div>

                    <div className="event-location-box">
                        <h3>Location</h3>
                        <div className="event-underline"></div>
                        <p style={{ marginBottom: '20px' }}>{event.location}</p>
                    </div>

                    <div className='event-about-box'>
                        <h3>About Event</h3>
                        <div className="event-underline"></div>
                        <p style={{ marginBottom: '20px' }}>{event.description}</p>
                    </div>
                </div>

                <div className="event-ticket-box">
                    <h3>Price</h3>
                    <div className="event-underline"></div>
                    <p>${event.price}</p>
                    <button className="event-buy-button" onClick={handleBuyTickets}>Buy Ticket</button>
                </div>
            </div>

            <div className="event-review-section">
                <h3>Reviews</h3>
                <div className="event-underline"></div>
                {reviews.map((review) => (
                    <div key={review.id} className="event-review"> 
                        <p>{review.review_txt}</p>
                    </div>
                ))}
                <form onSubmit={handleReviewSubmit} className="event-review-form">
                    <input 
                        type="text" 
                        value={newReview} 
                        onChange={handleReviewChange} 
                        placeholder="Write a review..." 
                        className="event-review-input"
                    />
                    <button type="submit" className="event-review-submit-button">Submit</button>
                </form>
            </div>

            {showLoginPopup && (
                <div className="login-popup">
                    <div className="login-popup-content">
                        <p>You must be logged in to submit a review.</p>
                        <button onClick={() => setShowLoginPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventPage;