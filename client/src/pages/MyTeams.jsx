import React, { useState } from "react";
import { TEAMS } from "../constants";
import "./MyTeams.css";

const MyTeams = () => {
    const [teams, setTeams] = useState(TEAMS);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    const [newProjectName, setNewProjectName] = useState("");
    const [members, setMembers] = useState([]);
    const [memberInput, setMemberInput] = useState("");
    const [inviteLink, setInviteLink] = useState("");
    const [toast, setToast] = useState(null);

  const filteredTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.project.toLowerCase().includes(search.toLowerCase())
  );

    const handleCreateTeam = () => {
    if (!newTeamName.trim()) {
        showToast("Please enter a team name", "error");
        return;
    }

    if (!newProjectName.trim()) {
        showToast("Please enter a project name", "error");
        return;
    }

    const colors = ["#63daff","#34d399","#a78bfa","#fbbf24","#f87171","#fb923c","#f472b6"];
    const icons = ["groups","hub","rocket_launch","science","code","palette","language"];

    const color = colors[Math.floor(Math.random() * colors.length)];
    const icon = icons[Math.floor(Math.random() * icons.length)];

    const newTeam = {
        id: "t" + Date.now(),
        name: newTeamName,
        project: newProjectName,
        desc: members.length
        ? `Members: ${members.slice(0, 3).join(", ")}${members.length > 3 ? ` +${members.length - 3} more` : ""}`
        : "New team — add description later",
        domain: "Custom",
        domainIcon: icon,
        color,
        accent: `${color}20`,
        dot: `${color}30`,
        role: "Lead",
        members: [
        { init: "AS", bg: color },
        ...members.slice(0, 4).map((m, i) => ({
            init: m.slice(0, 2).toUpperCase(),
            bg: colors[(i + 2) % colors.length],
        })),
        ],
        memberCount: 1 + members.length,
    };

    // update teams (IMPORTANT)
    setTeams((prev) => [newTeam, ...prev]);

    setIsModalOpen(false);
    showToast(`Team "${newTeamName}" created!`, "success");
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

    const handleMemberKeyDown = (e) => {
        if (e.key === "Enter" && memberInput.trim()) {
            e.preventDefault();

            if (!members.includes(memberInput) && members.length < 15) {
            setMembers([...members, memberInput.trim()]);
            }

            setMemberInput("");
        }
    };

    const copyLink = () => {
        navigator.clipboard?.writeText(inviteLink);
        showToast("Invite link copied!", "success");
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

      <nav className="topbar">
        <a href="#" className="logo">
          <span className="material-icons-round logo-icon">bolt</span>
          Team<span className="logo-accent">Up</span>
        </a>
        <div className="nav-actions">
          <div className="nav-icon-btn">
            <span className="material-icons-round">notifications_none</span>
          </div>
          <div className="nav-icon-btn">
            <span className="material-icons-round">settings</span>
          </div>
          <div className="nav-avatar">AS</div>
        </div>
      </nav>

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
              key={team.id}
              style={{ borderColor: team.color }}
            >
              <div className="card-bar" style={{ background: team.color }}></div>
              <div className="card-banner" style={{ background: team.color + "20" }}>
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
                <div className="card-project-name">{team.project}</div>
                <div className="card-desc">{team.desc}</div>
              </div>
                <div className="card-footer">
                <div className="card-members">
                    <div className="member-avatars">
                    {team.members?.slice(0, 5).map((m, index) => (
                        <div
                        key={index}
                        className="member-av"
                        style={{
                            background: m.bg + "22",
                            borderColor: m.bg + "44",
                            color: m.bg,
                        }}
                        >
                        {m.init}
                        </div>
                    ))}
                    </div>

                    <span className="member-count">
                    {team.memberCount || team.members?.length} members
                    </span>
                </div>

                <button className="card-open-btn">
                    Open <span className="material-icons-round">arrow_forward</span>
                </button>
                </div>
            </div>
          ))}

          {/* Create Team Card */}
          <div className="create-card" onClick={() => setIsModalOpen(true)}>
            <div className="create-icon">
              <span className="material-icons-round">add</span>
            </div>
            <div className="create-label">Create Team</div>
            <div className="create-hint">Start a new collaboration</div>
          </div>
        </div>
      </main>

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
            <label><span class="material-icons-round">drive_file_rename_outline</span>Team Name</label>
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
            <label><span class="material-icons-round">folder_special</span>Project Name</label>
            <div className="input-wrap">
            <span className="material-icons-round i-icon">rocket_launch</span>
            <input
                type="text"
                id="newProjectName"
                placeholder="e.g. HackBot — AI Assistant"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
            />
            </div>
        </div>

        {/* Members */}
        <div className="field">
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
        </div>

        {/* Invite Link */}
        <div className="field">
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
        </div>

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