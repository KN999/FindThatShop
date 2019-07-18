import React from 'react';
import './Homepage.css';
import SimpleMap from './map';
import Navbar from './Navbar'

export default function Homepage() {      
    
return (
    <div>
        <Navbar />    
        <div className="align-webkit-center margin-16">
            <div className="input-group width-65">
                <input type="text" name="thing" className="form-control" placeholder="Search e.g- Refine oil"/>
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-primary">search</button>
                </span>
            </div>
            <legend className="padding-top-1 margin-bottom-0">OR</legend>
            <legend><a href="/Register">Register your Shop with us</a></legend>
        </div>
    </div>
  );
}