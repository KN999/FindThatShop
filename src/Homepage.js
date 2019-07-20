import React from 'react';
import './Homepage.css';
import SimpleMap from './map';
import Navbar from './Navbar'

export default function Homepage() {      
    
return (
    <div>
        <Navbar />    
        <div className="align-webkit-center margin-16">
            <h1>Hi</h1>
            <h3>Check things if they are available near you</h3>
            <div className="input-group width-65 ">
                <input type="text" name="thing" className="form-control" placeholder="Enter a thing you wanna know about"/>
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-primary">search</button>
                </span>
            </div>
        </div>
    </div>
  );
}