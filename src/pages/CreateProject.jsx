import React, { useState, useRef, useEffect } from "react";
import { DOMAINS } from '../constants';
import './CreateProject.css'
const CreateProject = () => {
    // ───────────────── STATE ─────────────────
    const [projectName, setProjectName] = useState("");
    const [domain, setDomain] = useState(null);
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [errors, setErrors] = useState({});
    const [visibility, setVisibility] = useState("public");
    const [domainOpen, setDomainOpen] = useState(false);
    const [domainSearch, setDomainSearch] = useState("");
    const [selectedDomain, setSelectedDomain] = useState(null);

    const comboRef = useRef();

    // ───────────────── HELPERS ─────────────────
    const countWords = (str) =>
        str.trim() === "" ? 0 : str.trim().split(/\s+/).length;

    const handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const mapped = selectedFiles.map(file => ({
        file,
        path: file.webkitRelativePath || file.name
        }));

        setFiles(prev => [...prev, ...mapped]);
    };

    const removeFile = (path) => {
        setFiles(prev => prev.filter(f => f.path !== path));
    };

    // ───────────────── VALIDATION ─────────────────
    const validate = () => {
        let err = {};

        if (!projectName || projectName.length < 3)
        err.projectName = "Min 3 characters required";

        if (!domain)
        err.domain = "Select a domain";

        if (countWords(description) < 5)
        err.description = "Minimum 5 words required";

        if (files.length === 0)
        err.files = "Upload at least 1 file";

        if (!captchaVerified)
        err.captcha = "Verify captcha";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    // ───────────────── SUBMIT ─────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
        name: projectName,
        domain: domain.value,
        description,
        files: files.map(f => ({
            path: f.path,
            size: f.file.size,
            type: f.file.type
        }))
        };

        console.log("Submitting:", payload);

        // TODO: API call here
    };

    // ───────────────── CAPTCHA ─────────────────
    const handleCaptcha = () => {
        setTimeout(() => {
        setCaptchaVerified(true);
        }, 1000);
    };

    useEffect(() => {
    const handleClickOutside = (e) => {
        if (comboRef.current && !comboRef.current.contains(e.target)) {
        setDomainOpen(false);
        }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") setDomainOpen(false);
  };

  document.addEventListener("keydown", handleEsc);
  return () => document.removeEventListener("keydown", handleEsc);
}, []);
  return (
    <div>
        <div className="bg-grid"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        <nav className="topbar">
            <a href="#" className="logo">
            <span className="material-icons-round logo-icon">bolt</span>
            <span>Team<span className="logo-accent">Up</span></span>
            </a>
            <div className="nav-right">
            <div className="nav-avatar">
                <span className="material-icons-round">person</span>
            </div>
            </div>
        </nav>
        <main className="page">

            <div className="page-title-row">
            <div className="page-title-icon">
                <span className="material-icons-round">rocket_launch</span>
            </div>
            <div className="page-title-text">
                <h1>Create a New Project</h1>
                <p>Set up your project workspace and invite collaborators</p>
            </div>
            </div>

            <form id="projectForm" noValidate onSubmit={handleSubmit}>

            <div className="section-card">
                <div className="section-label">
                <span className="material-icons-round">edit_note</span>
                Project Basics
                </div>

                <div className="field-group">
                <label className="field-label">
                    <span className="material-icons-round">drive_file_rename_outline</span>
                    Project Name
                </label>
                <div className="input-wrap" id="wrap-projName">
                    <span className="material-icons-round inp-icon">folder_special</span>
                    <input
                    type="text" id="projName" name="projName"
                    placeholder="e.g. HackBot — AI Hackathon Assistant"
                    autoComplete="off" maxLength="80"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    />
                    <span className="input-count" id="nameCount">{projectName.length}/80</span>
                    {errors.projectName && <span className="error-msg">{errors.projectName}</span>}
                </div>
                <div className="error-msg" id="err-projName"></div>
                </div>

                <div className="field-group">
                <label className="field-label">
                    <span className="material-icons-round">hub</span>
                    Domain of Project
                </label>

                <div className="combo-wrap" ref={comboRef}>
                    
                    {/* Trigger */}
                    <div
                    className={`combo-trigger ${domainOpen ? "open" : ""}`}
                    onClick={() => setDomainOpen(prev => !prev)}
                    >
                    <span className="material-icons-round inp-icon">
                        {selectedDomain?.icon || "category"}
                    </span>

                    <input
                        type="text"
                        placeholder="Search or select a domain…"
                        value={domainSearch || selectedDomain?.label || ""}
                        onChange={(e) => {
                        setDomainSearch(e.target.value);
                        setDomainOpen(true);
                        }}
                        readOnly={!domainOpen}
                    />

                    <span className="material-icons-round combo-chevron">
                        expand_more
                    </span>
                    </div>

                    {/* Dropdown */}
                    {domainOpen && (
                    <div className="combo-menu open">
                        {DOMAINS.map(group => {
                        const filtered = group.items.filter(item =>
                            item.label.toLowerCase().includes(domainSearch.toLowerCase())
                        );

                        if (!filtered.length) return null;

                        return (
                            <div key={group.group}>
                            <div className="combo-group-label">{group.group}</div>

                            {filtered.map(item => (
                                <div
                                key={item.value}
                                className={`combo-item ${
                                    selectedDomain?.value === item.value ? "selected" : ""
                                }`}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    setSelectedDomain(item);
                                    setDomainSearch("");
                                    setDomainOpen(false);
                                    setDomain(item); // IMPORTANT (your main state)
                                }}
                                >
                                <span className="material-icons-round ci-icon">
                                    {item.icon}
                                </span>

                                {item.label}

                                {item.tag && (
                                    <span className={`ci-tag tag-${item.tag}`}>
                                    {item.tag.toUpperCase()}
                                    </span>
                                )}
                                </div>
                            ))}
                            </div>
                        );
                        })}

                        {/* No results */}
                        {!DOMAINS.some(group =>
                        group.items.some(item =>
                            item.label.toLowerCase().includes(domainSearch.toLowerCase())
                        )
                        ) && (
                        <div className="combo-empty">
                            <span className="material-icons-round">search_off</span>
                            No domains match "{domainSearch}"
                        </div>
                        )}
                    </div>
                    )}
                </div>

                {errors.domain && <div className="error-msg">{errors.domain}</div>}
                </div>

                <div className="field-group">
                <label className="field-label">
                    <span className="material-icons-round">description</span>
                    Project Description
                </label>
                <div className="textarea-wrap">
                    <textarea
                    id="description" name="description"
                    placeholder="Describe your project — what problem does it solve, what tech stack will you use, what are your goals? (max 300 words)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    />
                    {/* <p>{countWords(description)}/300 words</p> */}
                    {errors.description && <span>{errors.description}</span>}
                    <div className="textarea-footer">
                    <span className="textarea-hint">Be specific — helps teammates understand your vision</span>
                    <span className="word-counter" id="wordCounter">{countWords(description)} / 300 words</span>
                    </div>
                </div>
                {/* <div className="error-msg" id="err-description"></div> */}
                </div>
            </div>

            <div className="section-card green">
                <div className="section-label">
                <span className="material-icons-round">visibility</span>
                Project Visibility
                </div>

                <div className="visibility-toggle">
                <label className="vis-option pub">
                    <input type="radio" name="visibility" value="public" checked={visibility === "public"} onChange={(e) => setVisibility("public")}/>
                    <div className="vis-inner">
                    <div className="vis-icon">
                        <span className="material-icons-round">public</span>
                    </div>
                    <div className="vis-text">
                        <strong>Public</strong>
                        <span>Anyone can view this project. Great for open source and showcasing work.</span>
                    </div>
                    <div className="vis-dot"></div>
                    </div>
                </label>

                <label className="vis-option priv">
                    <input type="radio" name="visibility" value="private" checked={visibility === "private"} onChange={(e) => setVisibility("private")}/>
                    <div className="vis-inner">
                    <div className="vis-icon">
                        <span className="material-icons-round">lock</span>
                    </div>
                    <div className="vis-text">
                        <strong>Private</strong>
                        <span>Only invited members can access. Ideal for teams and private builds.</span>
                    </div>
                    <div className="vis-dot"></div>
                    </div>
                </label>
                </div>
            </div>

            <div className="section-card violet">
                <div className="section-label">
                <span className="material-icons-round">upload_file</span>
                Upload Project Files
                </div>

                <div className="upload-zone" id="dropZone">
                <input type="file" id="fileInput" multiple onChange={handleFileUpload}/>
                <div className="upload-icon">
                    <span className="material-icons-round">cloud_upload</span>
                </div>
                <h4>Drag &amp; drop files or folders here</h4>
                <p>Supports any file type · Max 50MB per file</p>
                <div className="upload-or">
                    <div className="upload-or-line"></div>
                    <span>or</span>
                    <div className="upload-or-line"></div>
                </div>
                <div className="upload-btns">
                    <button type="button" className="btn-upload-type" id="browseFiles">
                    <span className="material-icons-round">insert_drive_file</span>
                    Browse Files
                    </button>
                    <button type="button" className="btn-upload-type" id="browseFolder">
                    <span className="material-icons-round">folder_open</span>
                    Upload Folder
                    </button>
                </div>
                </div>

                <input type="file" id="folderInput" webkitdirectory="true" multiple style={{display:'none'}}/>

                <div className="file-tree-wrap" id="fileTreeWrap" style={{display:'none'}}>
                <div className="file-tree-header">
                    <div className="file-tree-header-left">
                    <span className="material-icons-round">account_tree</span>
                    Project Structure
                    </div>
                    <button type="button" className="file-tree-clear" id="clearAllFiles">
                    <span className="material-icons-round">delete_sweep</span>
                    Clear all
                    </button>
                </div>
                <div className="file-tree" id="fileTree"></div>
                <div className="upload-stats" id="uploadStats"></div>
                </div>

                <div className="error-msg" style={{marginTop:'8px'}} id="err-files"></div>
            </div>

            <div className="section-card">
                <div className="section-label">
                <span className="material-icons-round">verified_user</span>
                Human Verification
                </div>

                <div className="captcha-box" id="captchaBox" role="button" tabIndex={0} onClick={handleCaptcha}>
                <div className="captcha-left">
                    <div className="captcha-checkbox" id="captchaCheck">
                    <span className="material-icons-round">check</span>
                    </div>
                    <div className="captcha-label">
                    I'm not a robot
                    <small id="captchaSubtext">Click to verify</small>
                    </div>
                </div>
                <div className="captcha-right">
                    <div className="captcha-logo">reCAPTCHA</div>
                    <div className="captcha-badge">Protected by<br/>TeamUp Shield</div>
                </div>
                </div>
                <div className="error-msg" id="err-captcha"></div>
                <small>
                    {captchaVerified ? "Verified ✓" : "Click to verify"}
                </small>

                {errors.captcha && <span className="error-msg">{errors.captcha}</span>}
            </div>

            <div className="actions-bar">
                <button type="button" className="btn-discard" id="discardBtn">
                <span className="material-icons-round">close</span>
                Discard
                </button>
                <button type="submit" className="btn-upload" id="submitBtn">
                <span id="submitText">
                    <span className="material-icons-round">rocket_launch</span>
                    Upload Project
                </span>
                <span className="btn-loader" id="submitLoader"></span>
                </button>
            </div>

            </form>
        </main>
        <div className="success-overlay" id="successOverlay">
            <div className="success-card">
            <div className="success-ring-wrap">
                <div className="success-ring"></div>
                <span className="material-icons-round">check</span>
            </div>
            <h2>Project Created! 🎉</h2>
            <p>Your project has been uploaded and is now live on TeamUp.</p>
            <div className="success-meta" id="successMeta"></div>
                <button className="btn-view-proj">
                <span className="material-icons-round">open_in_new</span>
                View Project
            </button>
            </div>
        </div>
        <div className="toast-container" id="toastContainer"></div>
    </div>
  )
}

export default CreateProject