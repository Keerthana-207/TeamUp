import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import axios from 'axios';

const Register = () => {
    const [step, setStep] = useState(1);
    // const [skills, setSkills] = useState([]);
    // const [interests, setInterests] = useState([]);
    const [interestInput, setInterestInput] = useState("");
    const [skillInput, setSkillInput] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const strengthConfig = [
        { pct: 0,   color: "transparent", text: "Password strength" },
        { pct: 25,  color: "var(--red)", text: "Weak" },
        { pct: 50,  color: "var(--yellow)", text: "Fair" },
        { pct: 75,  color: "#a3e635", text: "Good" },
        { pct: 100, color: "var(--green)", text: "Strong" },
    ];

    const cfg = strengthConfig[passwordStrength];

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        college: '',
        department: '',
        yearOfStudy: '',
        // skills: [],
        // interests: [],
        github: '',
        linkedin: '',
        instagram: '',
        youtube: '',
        bio: '',
        terms: false
    });

    const years = ["School", "1", "2", "3", "4", "PG", "PhD", "Others"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const selectYear = (year) => {
        setFormData(prev => ({
            ...prev,
            yearOfStudy: year
        }));
    };

    // const handleSkillKeyDown = (e) => {
    //     if (e.key === "Enter" && skillInput.trim() !== "") {
    //         e.preventDefault();

    //         if (!skills.includes(skillInput.trim())) {
    //         setSkills([...skills, skillInput.trim()]);
    //         }

    //         setSkillInput("");
    //     }
    // };
    // const handleInterestKeyDown = (e) => {
    //     if (e.key === "Enter" && interestInput.trim() !== "") {
    //         e.preventDefault();

    //         if (!interests.includes(interestInput.trim())) {
    //         setInterests([...interests, interestInput.trim()]);
    //         }

    //         setInterestInput("");
    //     }
    // };
    // const removeSkill = (skillToRemove) => {
    //     setSkills(skills.filter(skill => skill !== skillToRemove));
    // };

    // const addSkill = (skill) => {
    //     if (!skills.includes(skill)) {
    //         setSkills([...skills, skill]);
    //     }
    // };

    // const removeInterest = (item) => {
    //     setInterests(interests.filter(i => i !== item));
    // };
    // const addInterest = (item) => {
    //     if (!interests.includes(item)) {
    //         setInterests([...interests, item]);
    //     }
    // };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terms) {
        toast.warn("Please accept Terms & Conditions");
        return;
    }
    try {
        const data = new FormData();

        // Append all fields from formData
        Object.keys(formData).forEach(key => {
            // Only append simple fields, skip undefined or null
            if (formData[key] !== null && formData[key] !== undefined) {
                data.append(key, formData[key]);
            }
        });

        // Append profile photo separately
        if (profilePhoto) {
            data.append("profilePhoto", profilePhoto);
        }

        const res = await axios.post(
            "http://localhost:3001/api/auth/register",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        console.log(res.data);
        toast.success("Registered successfully!");
        navigate('/login');
    }
    catch (err) {
        console.error(err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Registration failed");
    }
};

    const validateStep = () => {
        if (step === 1) {
            if (!formData.fullName || !formData.email || !formData.password || !formData.role) {
                // alert("Please fill all required fields");
                toast.warn("Please fill all required fields")
                return false;
            }

            if (formData.password !== formData.confirmPassword) {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: "Passwords do not match"
                }));
                return false;
            }
        }

        if (step === 2) {
            if (!formData.college || !formData.department || !formData.yearOfStudy) {
                // alert("Please fill all required fields in Step 2");
                toast.warn("Please fill all required fields");
                return false;
            }
        }

        return true;
    };
    const nextStep = () => {
        if (!validateStep()) return;
        if (step < 4) setStep(step + 1);
    };
    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    }
    const getStrength = (password) => {
        let score = 0;

        if (password.length > 5) score++;
        if (password.length > 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        return Math.min(score, 4);
    };

  return (
    <main>
        <ToastContainer position='top-right' theme='dark' autoClose={3000}/>
        <div className="bg-grid"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>  
        <div className="page-wrapper">

        <header className="site-header">
            <div className="logo">
                <span className="material-icons-round logo-icon">bolt</span>
                <span className="logo-text">Team<span className="logo-accent">Up</span></span>
            </div>
            <p className="tagline">Build. Connect. Launch.</p>
        </header>
        <div className="card" id="registerCard">
            <div className="step-progress">
            {[1, 2, 3].map((s, index) => (
                <React.Fragment key={s}>
                <div
                    className={`step 
                    ${step === s ? "active" : ""} 
                    ${step > s ? "done" : ""}
                    `}
                >
                    <div className="step-dot"><span>{s}</span></div>
                    <div className="step-label">
                    {["Account", "Academic", "Skills", "Profile"][index]}
                    </div>
                </div>

                {s !== 3 && (
                    <div
                    className={`step-line ${step > s ? "done" : ""}`}
                    ></div>
                )}
                </React.Fragment>
            ))}
            </div>
            <form id="registerForm" onSubmit={handleSubmit} noValidate >
                {/* STEP 1 */}
                {step === 1 && (
                <div className={`form-step ${step === 1 ? 'active': ''}`} id="step-1">
                    <div className="step-header">
                        <h2>Create Your Account</h2>
                        <p>Let's start with the basics</p>
                    </div>
                    <div className="photo-upload-area">
                        <div className="photo-preview" id="photoPreview">
                            <span className="material-icons-round photo-placeholder">add_a_photo</span>
                            <img id="photoImg" src="" alt="Profile" style={{display:'none'}}/>
                        </div>
                        <div className="photo-upload-text">
                            <label htmlFor="profilePhoto" className="upload-btn">
                                <span className="material-icons-round" style={{fontSize:'15px',verticalAlign:'-3px',marginRight:'4px'}}>upload</span>Upload Photo
                            </label>
                            <input type="file" id="profilePhoto" name="profilePhoto" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])} hidden/>
                            <span className="upload-hint">JPG, PNG, WebP · Max 2MB</span>
                        </div>
                    </div>
                    <div className="field-group">
                        <label htmlFor="fullName">Full Name</label>
                        <div className="input-wrap">
                            <span className="material-icons-round input-icon">person</span>
                            <input 
                                type="text" 
                                id="fullName" 
                                name="fullName" 
                                placeholder="e.g. Aryan Sharma" 
                                autoComplete="off"
                                value={formData.fullName}
                                onChange={handleChange}/>
                        </div>
                    <div className="error-msg" id="err-fullName"></div>
                </div>

                    <div className="field-group">
                        <label htmlFor="email">College Email ID</label>
                        <div className="input-wrap">
                            <span className="material-icons-round input-icon">mail</span>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="aryan@college.edu" 
                                autoComplete="off"
                                value={formData.email}
                                onChange={handleChange}/>
                        </div>
                        <div className="error-msg" id="err-email"></div>
                    </div>

                    <div className="field-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrap">
                            <span className="material-icons-round input-icon">lock</span>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={(e) => {
                                handleChange(e);
                                setPasswordStrength(getStrength(e.target.value));

                                if (formData.confirmPassword && e.target.value !== formData.confirmPassword) {
                                    setErrors(prev => ({
                                        ...prev,
                                        confirmPassword: "Passwords do not match"
                                    }));
                                } else {
                                    setErrors(prev => ({
                                        ...prev,
                                        confirmPassword: ""
                                    }));
                                }
                            }}/>
                            <button type="button" className="toggle-pw" data-target="password" data-icon="eye-password">
                                <span className="material-icons-round" id="eye-password">visibility</span>
                            </button>
                        </div>
                        <div className="strength-bar">
                        <div 
                            className="strength-fill"
                            style={{
                                width: `${cfg.pct}%`,
                                background: cfg.color
                            }}
                        ></div>
                    </div>

                    <div 
                        className="strength-label"
                        style={{ color: cfg.color }}
                    >
                        {cfg.text}
                    </div>
                        {/* <div className="strength-label" id="strengthLabel">Password strength</div> */}
                        <div className="error-msg" id="err-password"></div>
                    </div>

                    <div className="field-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="input-wrap">
                            <span className="material-icons-round input-icon">key</span>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                placeholder="Re-enter your password"
                                value={formData.confirmPassword}
                                onChange={(e) => {
                                    handleChange(e);

                                    if (formData.password !== e.target.value) {
                                        setErrors(prev => ({
                                            ...prev,
                                            confirmPassword: "Passwords do not match"
                                        }));
                                    } else {
                                        setErrors(prev => ({
                                            ...prev,
                                            confirmPassword: ""
                                        }));
                                    }
                                }}
                            />
                            <button type="button" className="toggle-pw" data-target="confirmPassword" data-icon="eye-confirmPassword">
                                <span className="material-icons-round" id="eye-confirmPassword">visibility</span>
                            </button>
                        </div>
                        <div className="error-msg">
                            {errors.confirmPassword}
                        </div>
                    </div>

                    <div className="field-group">
                        <label>I am a…</label>
                        <div className="role-cards">
                            <label className="role-card">
                                <input type="radio" name="role" value="Student" checked={formData.role === "Student"} onChange={handleChange}/>
                                <div className="role-inner">
                                    <span className="material-icons-round role-icon">school</span>
                                    <span>Student</span>
                                </div>
                            </label>
                            <label className="role-card">
                                <input type="radio" name="role" value="Mentor" checked={formData.role === "Mentor"} onChange={handleChange}/>
                                <div className="role-inner">
                                    <span className="material-icons-round role-icon">psychology</span>
                                    <span>Mentor</span>
                                </div>
                            </label>
                            <label className="role-card">
                                <input type="radio" name="role" value="Admin" checked={formData.role === "Admin"} onChange={handleChange}/>
                                <div className="role-inner">
                                    <span className="material-icons-round role-icon">admin_panel_settings</span>
                                    <span>Admin</span>
                                </div>
                            </label>
                        </div>
                        <div className="error-msg" id="err-role"></div>
                    </div>

                    <div className="btn-row">
                        <div></div>
                        <button type="button" className="btn-next" onClick={nextStep}>
                            Next <span className="material-icons-round btn-arrow">arrow_forward</span>
                        </button>
                </div>
                </div>
                )}
                {/* STEP 2 */}
                {step === 2 && (
                <div className={`form-step ${step === 2 ? 'active': ''}`}>
                    <div className="step-header">
                        <h2>Academic Details</h2>
                        <p>Tell us about your institution</p>
                    </div>

                    <div className="field-group">
                    <label>College / University Name</label>

                    <div className="input-wrap">
                        <span className="material-icons-round input-icon">account_balance</span>

                        <input
                        type="text"
                        name="college"
                        placeholder="Search or type your college…"
                        autoComplete="off"
                        value={formData.college}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="error-msg"></div>
                    </div>

                    <div className="field-group">
                    <label>Department / Branch</label>

                    <div className="input-wrap">
                        <span className="material-icons-round input-icon">biotech</span>

                        <input
                        type="text"
                        name="department"
                        placeholder="Search or type your branch…"
                        autoComplete="off"
                        value={formData.department}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="error-msg"></div>
                    </div>

                    <div className="field-group">
                    <label>Year of Study</label>
                    <div className="year-chips" id="yearChips">
                    {years.map((year) => (
                    <button
                        key={year}
                        type="button"
                        className={`year-chip ${formData.yearOfStudy === year ? "selected" : ""}`}
                        onClick={() => selectYear(year)}
                    >
                        {year}
                    </button>
                    ))}
                    </div>
                    {/* <input type="hidden" id="yearOfStudy" name="yearOfStudy"/> */}
                    <div className="error-msg" id="err-yearOfStudy"></div>
                </div>

               <div className="btn-row">
                 {/* <button type="button" className="btn-back" onClick={() => window.prevStep(2)}> */}
                 <button type="button" className="btn-back">
                   <span className="material-icons-round btn-arrow-back" onClick={prevStep}>arrow_back</span> Back
                 </button>
                 {/* <button type="button" className="btn-next" onClick={() => window.nextStep(2)}> */}
                 <button type="button" className="btn-next" onClick={nextStep}>
                   Next <span className="material-icons-round btn-arrow">arrow_forward</span>
                 </button>
               </div>
                </div>
                )}
            {/* { step === 3 && (
             <div className={`form-step ${step === 3 ? 'active' : ''}`}>
               <div className="step-header">
                 <h2>Skills &amp; Interests</h2>
                 <p>What are you good at and passionate about?</p>
               </div>

                <div className="field-group">
                <label>
                    <span className="material-icons-round label-icon">code</span>
                    Your Skills
                </label>

                <div className="tag-input-wrap">
                    
                    {skills.map((skill, index) => (
                    <span key={index} className="tag">
                        {skill}
                        <button
                        type="button"
                        className="tag-remove"
                        onClick={() => removeSkill(skill)}
                        >
                        ×
                        </button>
                    </span>
                    ))}

                    <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Type a skill and press Enter…"
                    />
                </div>


                <div className="skill-suggestions">
                    <span className="sugg-label">Quick add:</span>

                    {[
                    "Python",
                    "JavaScript",
                    "UI/UX",
                    "ML/AI",
                    "React",
                    "Flutter",
                    "Data Science",
                    "Cloud",
                    ].map((sugg) => (
                    <button
                        key={sugg}
                        type="button"
                        className="sugg-chip"
                        onClick={() => addSkill(sugg)}
                    >
                        {sugg}
                    </button>
                    ))}
                </div>

                <div className="error-msg"></div>
                </div>

                <div className="field-group">
                <label>
                    <span className="material-icons-round label-icon">interests</span>
                    Interests
                </label>

                <div className="tag-input-wrap">
                    
                    {interests.map((item, index) => (
                    <span key={index} className="tag">
                        {item}
                        <button
                        type="button"
                        className="tag-remove"
                        onClick={() => removeInterest(item)}
                        >
                        ×
                        </button>
                    </span>
                    ))}


                    <input
                    type="text"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyDown={handleInterestKeyDown}
                    placeholder="Type an interest and press Enter…"
                    />
                </div>


                <div className="skill-suggestions">
                    <span className="sugg-label">Quick add:</span>

                    {[
                    "Hackathons",
                    "Research",
                    "Startups",
                    "Open Source",
                    "Robotics",
                    "Competitive Coding"
                    ].map((item) => (
                    <button
                        key={item}
                        type="button"
                        className="sugg-chip"
                        onClick={() => addInterest(item)}
                    >
                        {item}
                    </button>
                    ))}
                </div>

                <div className="error-msg"></div>
                </div>

               <div className="btn-row">
                 <button type="button" className="btn-back" onClick={prevStep}>
                   <span className="material-icons-round btn-arrow-back">arrow_back</span> Back
                 </button>
                 <button type="button" className="btn-next" onClick={nextStep}>
                   Next <span className="material-icons-round btn-arrow">arrow_forward</span>
                 </button>
               </div>
             </div>
            )} */}

            {step === 3 && (
             <div className={`form-step ${step === 3 ? 'active' : ''}`} id="step-4">
               <div className="step-header">
                 <h2>Complete Your Profile</h2>
                 <p>Optional links — but highly recommended!</p>
               </div>

               <div className="field-group">
                 <label htmlFor="github">GitHub Profile</label>
                 <div className="input-wrap">
                   <span className="material-icons-round input-icon">terminal</span>
                   <input type="url" id="github" name="github" placeholder="https://github.com/yourusername" value={formData.github} onChange={handleChange}/>
                 </div>
                 <div className="error-msg" id="err-github"></div>
               </div>

               <div className="field-group">
                 <label htmlFor="linkedin">LinkedIn Profile</label>
                 <div className="input-wrap">
                   <span className="material-icons-round input-icon">work</span>
                   <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" value={formData.linkedin} onChange={handleChange}/>
                 </div>
                 <div className="error-msg" id="err-linkedin"></div>
               </div>

               <div className="field-group">
                 <label htmlFor="instagram">Instagram Profile</label>
                 <div className="input-wrap">
                   <span className="material-icons-round input-icon">photo_camera</span>
                   <input type="url" id="instagram" name="instagram" placeholder="https://instagram.com/yourusername" value={formData.instagram} onChange={handleChange}/>
                 </div>
                 <div className="error-msg" id="err-instagram"></div>
               </div>

               <div className="field-group">
                 <label htmlFor="youtube">YouTube Channel</label>
                 <div className="input-wrap">
                   <span className="material-icons-round input-icon">smart_display</span>
                   <input type="url" id="youtube" name="youtube" placeholder="https://youtube.com/@yourchannel" value={formData.youtube} onChange={handleChange}/>
                 </div>
                 <div className="error-msg" id="err-youtube"></div>
               </div>

               <div className="field-group">
                 <label htmlFor="bio">Short Bio <span className="optional">(optional)</span></label>
                 <div className="textarea-wrap">
                   <textarea id="bio" name="bio" placeholder="Tell teams who you are — your passion, projects, or goals in 2–3 lines…" maxlength="200" rows="3" value={formData.bio} onChange={handleChange}></textarea>
                   <div className="char-count"><span id="bioCount">0</span>/200</div>
                 </div>
               </div>

               <label className="checkbox-label">
                 <input 
                    type="checkbox" 
                    id="terms" 
                    name="terms" 
                    checked={formData.terms}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        terms: e.target.checked
                    }))}/>
                 <span className="custom-check">
                   <span className="material-icons-round check-icon">check</span>
                 </span>
                 I agree to the <a href="#" className="link">Terms of Service</a> and <a href="#" class="link">Privacy Policy</a>
               </label>
               <div className="error-msg" id="err-terms"></div>

               <div className="btn-row">
                 <button type="button" className="btn-back" onClick={prevStep}>
                   <span className="material-icons-round btn-arrow-back">arrow_back</span> Back
                 </button>
                 <button type="submit" className="btn-submit" id="submitBtn" disabled={!formData.terms}>
                   <span id="submitText">
                     <span className="material-icons-round" style={{fontSize:'17px',verticalAlign:'-3px',marginRight:'4px'}}>rocket_launch</span>Create Account
                   </span>
                   <span id="submitLoader" className="loader" style={{display:'none'}}></span>
                 </button>
               </div>
             </div> 
            )}               

            </form>
        </div>
    </div>
    </main>
  )
}

export default Register
