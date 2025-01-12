import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import './App.css';
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"
import ContactDetail from "./ContactDetail"
import api from "../api/contacts";
import EditContact from "./EditContact"

function App() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setsearchItem] = useState("");
    const [searchResults, setsearchResults] = useState([])

    const retrieveContacts = async () =>{
        const response = await api.get("/contacts");
        return response.data;
    }

    const addContactHandler = async (contact) =>{
        const request = {
            id: uuid(),
            ...contact
        }
        const response = await api.post("/contacts", request)
        setContacts([...contacts, response.data]);
    };

    const updateContactHandler = async (contact) =>{
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const {id, name, email} = response.data;
        setContacts(contacts.map((contact) =>{
            return contact.id === id ? {...response.data} : contact;
        }))
    }

    const searchHandler = (searchTerm) =>{
        setsearchItem(searchTerm);
        if(searchTerm !== ""){
            const newContactList = contacts.filter((contact)=>{
                return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
            })
            setsearchResults(newContactList);
        }
        else{
            setsearchResults(contacts);
        }
    }

    const removeContactHandler = async (id) =>{
        await api.delete(`/contacts/${id}`)
        const newContactList = contacts.filter((contact) => contact.id !== id);
        setContacts(newContactList);
    }

    useEffect(()=>{
        const getAllContacts = async () =>{
            const allContacts = await retrieveContacts();
            if(allContacts) setContacts(allContacts);
        }

        getAllContacts()
    }, []);

    return (
        <Router>
        <div className="ui container">
            <Header />
            <Routes>
                <Route path="/" element={<ContactList contacts={searchTerm.length < 1 ? contacts: searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />} />
                <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>} />
                <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler}/>} />
                <Route path="/contact/:id" element={<ContactDetail/>}/>
            </Routes>
        </div>
        </Router>
    );
}

export default App;