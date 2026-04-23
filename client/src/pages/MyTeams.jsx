import React, { useState, useEffect } from "react";
import { MAIN_NAV, ACCOUNT_NAV } from "../constants";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopBar from "../components/TopBar";
import "./MyTeams.css";

const MyTeams = () => {
    const [teams, setTeams] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newTeamName, setNewTeamName] = useState("");
    const [newProjectName, setNewProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [members, setMembers] = useState([]);
    const [memberInput, setMemberInput] = useState("");
    const [inviteLink, setInviteLink] = useState("");

    const [activeNav, setActiveNav] = useState("teams");
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    let currentUser = null;

    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        currentUser = JSON.parse(storedUser);
      }
    } catch (err) {
      console.error("Invalid user in localStorage");
    }
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/teams");

        const data = await res.json();

        setTeams(data);
      } catch (err) {
        showToast("Failed to load teams", "error");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3001/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);    
    useEffect(() => {
      fetchTeams();
    },[]);

  const filteredTeams = teams.filter((t) => {
    const teamName = t.name?.toLowerCase() || "";
    const projectName = t.project?.name?.toLowerCase() || "";

    return (
      teamName.includes(search.toLowerCase()) ||
      projectName.includes(search.toLowerCase())
    );
  });

const handleCreateTeam = async () => {
  try {
    if (!currentUser?._id) {
      showToast("User not logged in", "error");
      return;
    }

    const res = await axios.post("http://localhost:3001/api/teams/create", {
      teamName: newTeamName,
      projectName: newProjectName,
      description: projectDescription,
      domain: "Web Dev",
      members: [currentUser._id], // ✅ MUST be valid ObjectId
      lead: currentUser._id,
    });

    const createdTeam = res.data.team;

    setTeams((prev) => [createdTeam, ...prev]);

    showToast("Team created successfully!", "success");
    setIsModalOpen(false);

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    showToast(err.response?.data?.error || "Error creating team", "error");
  }
};

  // const openModal = () => {
  //   setMembers([]);
  //   setNewTeamName("");
  //   setNewProjectName("");
  //   setMemberInput("");

  //   const link =
  //       "https://teamup.dev/join/" +
  //       Math.random().toString(36).slice(2, 10).toUpperCase();

  //   setInviteLink(link);
  //   setIsModalOpen(true);
  //   };

  const handleMemberKeyDown = (e) => {
    if (e.key === "Enter" && memberInput.trim()) {
      e.preventDefault();

      if (!members.includes(memberInput) && members.length < 15) {
        setMembers([...members, memberInput.trim()]);
      }

      setMemberInput("");
    }
  };

  const removeMember = (member) => {
    setMembers((prev) => prev.filter((m) => m !== member));
  };

  const copyLink = () => {
      navigator.clipboard?.writeText(inviteLink);
      showToast("Invite link copied!", "success");
  };

  const openModal = () => {
    setMembers([]);
    setNewTeamName("");
    setNewProjectName("");
    setMemberInput("");

    const link =
      "https://teamup.dev/join/" +
      Math.random().toString(36).slice(2, 10).toUpperCase();

    setInviteLink(link);
    setIsModalOpen(true);
  };

  const showToast = (msg, type = "info") => {
      setToast({ msg, type });

      setTimeout(() => {
          setToast(null);
      }, 3000);
  };

  return (
    <div>
      <div className="bg-grid"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* TopBar */}
      <TopBar user={user} showToast={showToast} showGreeting={false} />

      <div className="app-layout">
          <aside className="db-sidebar">
            <div className="db-nav-section-label">Main</div>
            {MAIN_NAV.map(item => (
              <Link
                key={item.id}
                to={item.href}
                className={`db-nav-item ${activeNav === item.id ? "active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="material-icons-round">{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span className={`db-nav-badge ${item.badge.cls}`}>{item.badge.text}</span>
                )}
              </Link>
            ))}

          </aside>
        <main className="page">
          <div className="page-header">
            <div className="page-title-block">
              <div className="page-title-icon">
                <span className="material-icons-round">groups</span>
              </div>
              <div className="page-title-text">
                <h1>My Teams</h1>
                <p>Collaborate, build and launch together</p>
              </div>
            </div>
            <span className="header-stat">
              <span className="material-icons-round">groups</span>{" "}
              {teams.length} Teams
            </span>
          </div>

          <div className="toolbar">
            <div className="search-wrap">
              <span className="material-icons-round">search</span>
              <input
                type="text"
                placeholder="Search teams or projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="teams-grid">
            {filteredTeams.length === 0 && (
              <div className="empty-state visible">
                <div className="empty-icon">
                  <span className="material-icons-round">search_off</span>
                </div>
                <h3>No teams found</h3>
                <p>Try a different search term.</p>
              </div>
            )}

            {filteredTeams.map((team) => (
              <div
                className="team-card"
                key={team._id}
                style={{ borderColor: team.color || '"#6366f1"' }}
              >
                <div className="card-bar" style={{ background: team.color || "#6366f1" }}></div>
                <div className="card-banner" style={{ background: (team.color || "#6366f1") + "20" }}>
                  <div className="banner-pattern"></div>
                  <div className="banner-icon">
                    <span className="material-icons-round">{team.domainIcon}</span>
                  </div>
                  <span
                    className={`card-role-badge ${
                      team.role === "Lead" ? "role-lead" : "role-member"
                    }`}
                  >
                    {team.role === "Lead" ? "⭐ Lead" : "Member"}
                  </span>
                </div>
                <div className="card-body">
                  <div className="card-team-name" style={{color: team.color}}>{team.name}</div>
                  <div className="card-project-label">
                    <span className="material-icons-round">folder_special</span> Project
                  </div>
                  <div className="card-project-name">{team.project?.name || 'No Project'}</div>
                  <div className="card-desc">{team.description}</div>
                </div>
                  <div className="card-footer">
                  <div className="card-members">
                      <div className="member-avatars">
                      {team.members?.slice(0, 5).map((member, index) => (
                        <div key={member._id || index} className="member-av">

                          {/* PROFILE IMAGE */}
                          {member.profilePhoto ? (
                            <img
                              src={member.profilePhoto}
                              alt={member.fullName}
                              className="member-avatar-img"
                            />
                          ) : (
                            /* fallback initials */
                            member.fullName?.charAt(0).toUpperCase()
                          )}
                        </div>
                      ))}
                      </div>

                      <span className="member-count">
                      {team.members?.length || 0} members
                      </span>
                  </div>

                    <button
                      className="card-open-btn"
                      onClick={() => navigate(`/teams/${team._id}`)}
                    >
                      Open <span className="material-icons-round">arrow_forward</span>
                    </button>
                  </div>
              </div>
            ))}

            {/* Create Team Card */}
            <div className="create-card" onClick={openModal}>
              <div className="create-icon">
                <span className="material-icons-round">add</span>
              </div>
              <div className="create-label">Create Team</div>
              <div className="create-hint">Start a new collaboration</div>
            </div>
          </div>
        </main>
      </div>
      {/* Modal */}
    {isModalOpen && (
    <div className="modal-backdrop open" id="createModal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close" id="modalClose" onClick={() => setIsModalOpen(false)}>
            <span className="material-icons-round">close</span>
        </button>

        <div className="modal-header">
            <div className="modal-icon">
            <span className="material-icons-round">group_add</span>
            </div>
            <div>
            <h3>Create a New Team</h3>
            <p>Set up your team workspace in seconds</p>
            </div>
        </div>

        {/* Team Name */}
        <div className="field">
            <label><span className="material-icons-round">drive_file_rename_outline</span>Team Name</label>
            <div className="input-wrap">
            <span className="material-icons-round i-icon">groups</span>
            <input
                type="text"
                id="newTeamName"
                placeholder="e.g. Code Crusaders"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
            />
            </div>
        </div>

        {/* Project Name */}
        <div className="field">
            <label><span className="material-icons-round">folder_special</span>Project Name</label>
            <div className="input-wrap">
            <span className="material-icons-round i-icon">rocket_launch</span>
            <input
                type="text"
                id="newProjectName"
                placeholder="e.g. HackBot"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
            />
            </div>
        </div>

        {/* Description */}
        <div className="field">
            <label><span className="material-icons-round">folder_special</span>Project Name</label>
            <div className="input-wrap">
            <span className="material-icons-round i-icon">rocket_launch</span>
            <input
                type="text"
                id="projectDescription"
                placeholder="e.g. AI Assistant"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
            />
            </div>
        </div>

        {/* Members */}
        {/* <div className="field">
            <label><span class="material-icons-round">person_add</span>Add Members</label>
            <div className="member-tag-wrap">
            {members.map((m, i) => (
                <span key={i} className="mtag">
                {m}
                <button onClick={() => removeMember(m)}>×</button>
                </span>
            ))}
            <input
                type="text"
                id="memberInput"
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                onKeyDown={handleMemberKeyDown}
                placeholder="Type a name or email…"
            />
            </div>
        </div> */}

        {/* Invite Link */}
        {/* <div className="field">
            <label><span class="material-icons-round">link</span>Invite Link</label>
            <div className="invite-row">
            <div className="invite-input-wrap">
                <span class="material-icons-round i-icon">tag</span>
                <input id="inviteLinkInput" value={inviteLink} readOnly />
            </div>
            <button className="btn-copy" id="copyLinkBtn" onClick={copyLink}>
                <span class="material-icons-round">share</span>Share Link
            </button>
            </div>
        </div> */}

        {/* Footer */}
        <div className="modal-footer">
            <button className="btn-cancel" id="modalCancel" onClick={() => setIsModalOpen(false)}>
            Cancel
            </button>
            <button className="btn-create" id="createTeamBtn" onClick={handleCreateTeam}>
            <span class="material-icons-round">add_circle</span>Create Team
            </button>
        </div>
        </div>
    </div>
    )}
    </div>
  );
};

export default MyTeams;