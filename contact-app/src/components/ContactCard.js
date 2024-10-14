import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = (props)=>{
    const {id, name, email} = props.contact;
    return (
        <div className="item" style={{fontSize: "1.2rem"}}>
            <img className="ui avatar image" src={user} alt="user"/>
            <div className="content">
                <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <i className="trash alternate outline icon right floated" style={{color:"red", marginTop:"7px", cursor: "pointer", marginLeft:"10px"}} onClick={()=> props.clickHandler(id)}></i>
            <Link to={`/edit`} state={{ contact: props.contact }}>
                <i className="edit alternate outline icon right floated" style={{color:"blue", marginTop:"7px", cursor: "pointer"}}></i>
            </Link>
        </div>  
    );
}

export default ContactCard;