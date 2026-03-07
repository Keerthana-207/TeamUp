import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
    const [section, setSection] = useState('personal')
  return (
    <div className="profile-page">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">TeamUp</h2>

        <nav>
          <ul>
            <li className={section === 'personal'? 'active' : ''} onClick={() => setSection('personal')}>Personal</li>
            <li className={section === 'proffesional'? 'active' : ''} onClick={() => setSection('proffesional')}>Professional</li>
            <li className={section === 'skills'? 'active' : ''} onClick={() => setSection('skills')}>Skills</li>
            <li className={section === 'portfolio'? 'active' : ''} onClick={() => setSection('portfolio')}>Portfolio</li>
            <li className={section === 'availability'? 'active' : ''} onClick={() => setSection('availability')}>Availability</li>
          </ul>
        </nav>
      </aside>
        {/* Sections */}
      <main className="content">

        {section === "personal" && (
          <div className="profile-card">

            <h1>Personal Information</h1>

            <div className="avatar-section">
              <div className="avatar"></div>
                <label className="upload-btn">
                  Upload Photo
                <input type="file" hidden />
                </label>
              </div>

            <div className="form-container">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your name" />
              </div>

              <div className="form-group">
                <label>Username</label>
                <input type="text" placeholder="Enter username" />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <input type="text" placeholder="Short description about you" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="example@email.com" />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="City, Country" />
              </div>
            </div>

            <div className="btn-container">
              <button className="save-btn">Save Changes</button>
            </div>

          </div>
        )}

        {section === 'professional' && (
          <section>

          </section>
        )}

      </main>
    </div>
  );
};

export default Profile;