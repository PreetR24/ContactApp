import React, {useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) =>{
    const renderContactList = props.contacts.map((contact)=>{
        return (<ContactCard contact={contact} clickHandler={() => props.getContactId(contact.id)} key={contact.id}/>);
    })

    const inputEl = useRef("");
    const getsearchItem = () =>{
        props.searchKeyword(inputEl.current.value)
    }

    return (
        <div className="main">
            <h2>Contact List</h2>
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button blue right floated">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" placeholder="Search contacts" className="prompt" value={props.term} onChange={getsearchItem}></input>
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">{renderContactList.length>0 ? renderContactList: "No contacts avaiable"}</div>
        </div>
    );
}

export default ContactList;