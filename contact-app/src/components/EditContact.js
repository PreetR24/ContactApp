import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditContact = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, name, email } = location.state?.contact || { id: "", name: "", email: "" };
    
    const [contact, setContact] = React.useState({ id, name, email });

    const update = (e) => {
        e.preventDefault();
        if (contact.name === "" || contact.email === "") {
            alert("All the fields are mandatory!");
            return;
        }
        props.updateContactHandler(contact);
        setContact({ name: "", email: "" });
        navigate("/");
    };

    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <form className='ui form' onSubmit={update}>
                <div className='field'>
                    <label>Name</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Enter the name'
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    />
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter the email'
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                </div>
                <div className="buttons" style={{ display: "flex", justifyContent: "space-between" }}>
                    <button className="ui button blue">Add</button>
                    <button type="button" className="ui button black" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditContact;
 