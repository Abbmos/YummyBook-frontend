import { useState } from 'react';
import './CommentForm.css';

const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '', rating: '' });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddComment(formData);
        setFormData({ text: '', rating: '' });
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <label htmlFor="text-input">Your comment:</label>
            <textarea
                id="text-input"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
                placeholder="Share your thoughts about this recipe..."
            />
            
            <div className="rating-input-container">
                <label htmlFor="rating-input">Rating:</label>
                <input
                    type="number"
                    name="rating"
                    id="rating-input"
                    className="rating-input"
                    value={formData.rating}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    placeholder="1-5"
                    required
                />
            </div>

            <button type="submit" className="submit-button">
                Submit Comment
            </button>
        </form>
    );
};

export default CommentForm;