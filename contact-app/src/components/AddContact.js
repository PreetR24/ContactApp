import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContact = (props) => {
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const navigate = useNavigate();

    const add = (e) => {
        e.preventDefault();
        if (contactName === "" || contactEmail === "") {
            alert("All the fields are mandatory!");
            return;
        }
        props.addContactHandler({ name: contactName, email: contactEmail });
        setContactName("");
        setContactEmail("");
        navigate("/");
    };

    return (
        <div className="ui main">
            <h2>Add Contact</h2>
            <form className='ui form' onSubmit={add}>
                <div className='field'>
                    <label>Name</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Enter the name'
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                    />
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter the email'
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                    />
                </div>
                <div className="buttons" style={{ display: "flex", justifyContent: "space-between" }}>
                    <button className="ui button blue">Add</button>
                    <button
                        type="button"
                        className="ui button black"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddContact;