import { useState, useEffect, useCallback } from "react";

const API = "http://localhost:8080";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Barlow:wght@300;400;500;600;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #07090f;
    --s1:       #0c1018;
    --s2:       #111620;
    --s3:       #192130;
    --border:   #1f2d3d;
    --border2:  #263545;
    --accent:   #f0c040;
    --cyan:     #30d0c0;
    --text:     #dce8f0;
    --muted:    #4a6070;
    --muted2:   #2a3a48;
    --success:  #40d090;
    --danger:   #e04060;
  }

  html, body, #root { height: 100%; }

  body {
    background: var(--bg); color: var(--text);
    font-family: 'Barlow', sans-serif; font-size: 15px; line-height: 1.5;
    overflow-x: hidden;
  }

  body::before {
    content: ''; position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: .6;
  }

  .app { position: relative; z-index: 1; min-height: 100vh; display: flex; flex-direction: column; }

  .header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 64px;
    border-bottom: 1px solid var(--border);
    background: rgba(7,9,15,.85); backdrop-filter: blur(16px);
    position: sticky; top: 0; z-index: 200;
  }

  .logo { font-family: 'Space Mono', monospace; font-size: 17px; font-weight: 700; color: var(--accent); letter-spacing: -0.5px; }
  .logo span { color: var(--muted); font-weight: 400; }

  .header-right { display: flex; align-items: center; gap: 16px; }

  .live-dot { display: flex; align-items: center; gap: 8px; font-family: 'Space Mono', monospace; font-size: 11px; color: var(--success); }
  .live-dot::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--success); animation: blink 2s ease-in-out infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }

  .dropdown-wrap { position: relative; }

  .btn-new {
    display: flex; align-items: center; gap: 8px; padding: 8px 18px;
    background: var(--accent); color: var(--bg); border: none; border-radius: 6px;
    font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: .5px; text-transform: uppercase; cursor: pointer;
    transition: background .15s, transform .15s;
  }
  .btn-new:hover { background: #ffd060; transform: translateY(-1px); }

  .dropdown-menu {
    position: absolute; top: calc(100% + 8px); right: 0; width: 200px;
    background: var(--s1); border: 1px solid var(--border2); border-radius: 8px;
    overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,.5);
    animation: dropIn .15s ease; z-index: 300;
  }
  @keyframes dropIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

  .dropdown-item {
    display: flex; align-items: center; gap: 10px; padding: 12px 16px;
    cursor: pointer; font-size: 14px; font-weight: 500; color: var(--text);
    border-bottom: 1px solid var(--border); transition: background .1s;
  }
  .dropdown-item:last-child { border-bottom: none; }
  .dropdown-item:hover { background: var(--s2); }
  .dropdown-item .di-icon { font-size: 16px; width: 20px; text-align: center; }

  .main { flex: 1; padding: 36px 40px; }

  .board-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 28px; }
  .board-title { font-size: 32px; font-weight: 900; letter-spacing: -1.5px; line-height: 1; }
  .board-title span { color: var(--accent); }
  .board-meta { font-family: 'Space Mono', monospace; font-size: 12px; color: var(--muted); padding-bottom: 4px; }

  .kanban { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px; align-items: start; }

  .route-card {
    background: var(--s1); border: 1px solid var(--border); border-radius: 10px;
    overflow: hidden; cursor: pointer;
    transition: border-color .2s, transform .2s, box-shadow .2s;
    animation: cardIn .3s ease both;
  }
  .route-card:hover { border-color: var(--border2); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,.4); }
  .route-card.expanded { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent), 0 16px 48px rgba(240,192,64,.08); }
  @keyframes cardIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

  .card-top { display: flex; align-items: flex-start; justify-content: space-between; padding: 18px 20px 14px; }
  .card-id { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--accent); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 5px; }
  .card-name { font-size: 18px; font-weight: 700; letter-spacing: -.3px; color: var(--text); }

  .expand-icon {
    width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
    border-radius: 6px; background: var(--s2); border: 1px solid var(--border);
    color: var(--muted); font-size: 14px; flex-shrink: 0;
    transition: background .15s, color .15s, transform .2s;
  }
  .route-card.expanded .expand-icon { background: var(--accent); color: var(--bg); border-color: var(--accent); transform: rotate(180deg); }

  .card-stats { display: flex; border-top: 1px solid var(--border); }
  .stat { flex: 1; padding: 10px 16px; display: flex; flex-direction: column; gap: 2px; border-right: 1px solid var(--border); }
  .stat:last-child { border-right: none; }
  .stat-val { font-family: 'Space Mono', monospace; font-size: 20px; font-weight: 700; color: var(--cyan); }
  .stat-lbl { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); }

  .card-expanded { border-top: 1px solid var(--border); padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; animation: expandIn .2s ease; }
  @keyframes expandIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

  .section-label { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }

  .building-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; background: var(--s2); border: 1px solid var(--border);
    border-radius: 6px; margin-bottom: 6px;
    cursor: pointer; transition: border-color .15s, background .15s;
  }
  .building-row:hover { border-color: var(--accent); background: var(--s3); }
  .building-row:last-child { margin-bottom: 0; }
  .building-name { font-weight: 600; font-size: 14px; }
  .building-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }

  .building-row-right { display: flex; align-items: center; gap: 8px; }
  .edit-hint { font-size: 10px; color: var(--muted); font-family: 'Space Mono', monospace; opacity: 0; transition: opacity .15s; }
  .building-row:hover .edit-hint { opacity: 1; }

  .machine-badge { display: flex; align-items: center; gap: 5px; padding: 4px 10px; background: var(--s3); border: 1px solid var(--border2); border-radius: 20px; font-family: 'Space Mono', monospace; font-size: 11px; color: var(--cyan); white-space: nowrap; }

  .loading-row { padding: 20px; text-align: center; font-family: 'Space Mono', monospace; font-size: 12px; color: var(--muted); animation: pulse 1.5s ease infinite; }
  @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }

  .empty-buildings { padding: 16px; text-align: center; font-size: 13px; color: var(--muted); font-family: 'Space Mono', monospace; }

  .card-actions { display: flex; justify-content: flex-end; gap: 8px; padding-top: 4px; border-top: 1px solid var(--border); }
  .btn-sm { padding: 6px 14px; border-radius: 5px; font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; cursor: pointer; border: 1px solid transparent; transition: all .15s; }
  .btn-danger { background: transparent; border-color: var(--danger); color: var(--danger); }
  .btn-danger:hover { background: var(--danger); color: white; }

  .empty-state { grid-column: 1/-1; padding: 100px 40px; text-align: center; color: var(--muted); }
  .empty-glyph { font-size: 56px; margin-bottom: 20px; opacity: .2; font-family: 'Space Mono', monospace; }
  .empty-text { font-size: 14px; font-family: 'Space Mono', monospace; }

  /* ── Modal shared ── */
  .overlay {
    position: fixed; inset: 0; background: rgba(7,9,15,.8); backdrop-filter: blur(8px);
    z-index: 500; display: flex; align-items: center; justify-content: center;
    animation: fadeIn .2s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  .modal { width: 480px; background: var(--s1); border: 1px solid var(--border2); border-radius: 12px; overflow: hidden; animation: slideUp .25s ease; box-shadow: 0 32px 80px rgba(0,0,0,.6); }
  @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  .modal-header { padding: 22px 28px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .modal-title { font-size: 18px; font-weight: 700; letter-spacing: -.3px; }
  .modal-title span { color: var(--accent); }

  .modal-close { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: var(--s2); border: 1px solid var(--border); border-radius: 6px; color: var(--muted); font-size: 18px; cursor: pointer; transition: all .15s; }
  .modal-close:hover { border-color: var(--danger); color: var(--danger); }

  .modal-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 18px; }

  .field { display: flex; flex-direction: column; gap: 6px; }
  .field-label { font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }

  .field-input, .field-select {
    padding: 11px 14px; background: var(--s2); border: 1px solid var(--border);
    border-radius: 7px; color: var(--text); font-family: 'Barlow', sans-serif;
    font-size: 15px; outline: none; transition: border-color .15s; width: 100%;
  }
  .field-input:focus, .field-select:focus { border-color: var(--accent); }
  .field-input::placeholder { color: var(--muted2); }
  .field-select option { background: var(--s2); color: var(--text); }

  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .modal-footer { padding: 18px 28px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .modal-footer-right { display: flex; gap: 10px; }

  .btn-cancel { padding: 10px 20px; background: transparent; border: 1px solid var(--border2); border-radius: 6px; color: var(--muted); font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .15s; }
  .btn-cancel:hover { border-color: var(--text); color: var(--text); }

  .btn-submit { padding: 10px 24px; background: var(--accent); border: none; border-radius: 6px; color: var(--bg); font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; cursor: pointer; transition: all .15s; }
  .btn-submit:hover { background: #ffd060; }
  .btn-submit:disabled { opacity: .4; cursor: not-allowed; }

  .btn-delete { padding: 10px 20px; background: transparent; border: 1px solid var(--danger); border-radius: 6px; color: var(--danger); font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; transition: all .15s; }
  .btn-delete:hover { background: var(--danger); color: white; }

  .error-bar { padding: 10px 14px; background: rgba(224,64,96,.12); border: 1px solid rgba(224,64,96,.3); border-radius: 6px; font-size: 13px; color: var(--danger); font-family: 'Space Mono', monospace; }
`;

// ── Create Route Modal ───────────────────────────────────────────────────────
function CreateRouteModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ canonicalName: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    if (!form.canonicalName.trim()) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API}/routes`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ canonicalName: form.canonicalName }),
      });
      if (!res.ok) throw new Error(await res.text());
      onCreated(await res.json()); onClose();
    } catch (e) { setError(e.message || "Failed to create route."); }
    finally { setLoading(false); }
  };

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">New <span>Route</span></div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {error && <div className="error-bar">{error}</div>}
          <div className="field">
            <label className="field-label">Route Name</label>
            <input className="field-input" placeholder="e.g. North District" value={form.canonicalName}
              onChange={e => setForm({ canonicalName: e.target.value })}
              onKeyDown={e => e.key === "Enter" && submit()} autoFocus />
          </div>
        </div>
        <div className="modal-footer">
          <div />
          <div className="modal-footer-right">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn-submit" onClick={submit} disabled={loading || !form.canonicalName.trim()}>
              {loading ? "Creating…" : "Create Route"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Create Building Modal ────────────────────────────────────────────────────
function BuildingModal({ onClose, onSaved, onDeleted, routes, building }) {
  const isEdit = !!building;
  const [form, setForm] = useState({
    canonicalBuildingName: building?.canonicalBuildingName || "",
    address: building?.address || "",
    city: building?.city || "",
    numberOfMachines: building?.numberOfMachines ?? "",
    routeId: building?.routeId ? String(building.routeId) : "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.canonicalBuildingName.trim() || !form.routeId) return;
    setLoading(true); setError(null);
    try {
      const url = isEdit ? `${API}/buildings/${building.buildingId}` : `${API}/buildings`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          canonicalBuildingName: form.canonicalBuildingName,
          address: form.address,
          city: form.city,
          numberOfMachines: parseInt(form.numberOfMachines) || 0,
          routeId: parseInt(form.routeId),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      onSaved(await res.json()); onClose();
    } catch (e) { setError(e.message || "Failed to save building."); }
    finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${building.canonicalBuildingName}?`)) return;
    try {
      await fetch(`${API}/buildings/${building.buildingId}`, { method: "DELETE" });
      onDeleted(building.buildingId); onClose();
    } catch { setError("Failed to delete building."); }
  };

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{isEdit ? "Edit" : "New"} <span>Building</span></div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {error && <div className="error-bar">{error}</div>}
          <div className="field">
            <label className="field-label">Building Name</label>
            <input className="field-input" placeholder="e.g. Main Warehouse"
              value={form.canonicalBuildingName}
              onChange={e => set("canonicalBuildingName", e.target.value)} autoFocus />
          </div>
          <div className="field-row">
            <div className="field">
              <label className="field-label">City</label>
              <input className="field-input" placeholder="Chicago" value={form.city} onChange={e => set("city", e.target.value)} />
            </div>
            <div className="field">
              <label className="field-label">Machines</label>
              <input className="field-input" placeholder="0" type="number" value={form.numberOfMachines} onChange={e => set("numberOfMachines", e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="field-label">Address</label>
            <input className="field-input" placeholder="123 Main St" value={form.address} onChange={e => set("address", e.target.value)} />
          </div>
          <div className="field">
            <label className="field-label">Assigned Route</label>
            <select className="field-select" value={form.routeId} onChange={e => set("routeId", e.target.value)}>
              <option value="">— Select a route —</option>
              {routes.map(r => <option key={r.id} value={r.id}>{r.canonicalName}</option>)}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          {isEdit
            ? <button className="btn-delete" onClick={handleDelete}>Delete</button>
            : <div />
          }
          <div className="modal-footer-right">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn-submit" onClick={submit}
              disabled={loading || !form.canonicalBuildingName.trim() || !form.routeId}>
              {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Building"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Route Card ───────────────────────────────────────────────────────────────
function RouteCard({ route, onDelete, routes }) {
  const [expanded, setExpanded] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);

  const fetchBuildings = useCallback(async () => {
    setLoadingBuildings(true);
    try {
      const res = await fetch(`${API}/buildings/route/${route.id}`);
      if (!res.ok) throw new Error();
      setBuildings(await res.json());
    } catch { setBuildings([]); }
    finally { setLoadingBuildings(false); }
  }, [route.id]);

  const toggle = () => {
    if (!expanded) fetchBuildings();
    setExpanded(e => !e);
  };

  const handleBuildingSaved = (updated) => {
    setBuildings(prev => prev.map(b => b.buildingId === updated.buildingId ? updated : b));
  };

  const handleBuildingDeleted = (id) => {
    setBuildings(prev => prev.filter(b => b.buildingId !== id));
  };

  const totalMachines = buildings.reduce((s, b) => s + (b.numberOfMachines || 0), 0);

  return (
    <>
      <div className={`route-card${expanded ? " expanded" : ""}`}>
        <div className="card-top" onClick={toggle}>
          <div>
            <div className="card-id">Route #{route.id}</div>
            <div className="card-name">{route.canonicalName}</div>
          </div>
          <div className="expand-icon">▾</div>
        </div>

        <div className="card-stats">
          <div className="stat">
            <div className="stat-val">{expanded ? buildings.length : "—"}</div>
            <div className="stat-lbl">Buildings</div>
          </div>
          <div className="stat">
            <div className="stat-val">{expanded ? totalMachines : "—"}</div>
            <div className="stat-lbl">Machines</div>
          </div>
        </div>

        {expanded && (
          <div className="card-expanded">
            <div>
              <div className="section-label">Buildings on this route</div>
              {loadingBuildings ? (
                <div className="loading-row">Loading…</div>
              ) : buildings.length === 0 ? (
                <div className="empty-buildings">No buildings assigned yet.</div>
              ) : (
                buildings.map(b => (
                  <div className="building-row" key={b.buildingId}
                    onClick={e => { e.stopPropagation(); setEditingBuilding(b); }}>
                    <div>
                      <div className="building-name">{b.canonicalBuildingName}</div>
                      <div className="building-meta">{b.city}{b.address ? ` · ${b.address}` : ""}</div>
                    </div>
                    <div className="building-row-right">
                      <span className="edit-hint">edit</span>
                      <div className="machine-badge">⚙ {b.numberOfMachines}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="card-actions">
              <button className="btn-sm btn-danger" onClick={() => onDelete(route.id)}>Delete Route</button>
            </div>
          </div>
        )}
      </div>

      {editingBuilding && (
        <BuildingModal
          building={editingBuilding}
          routes={routes}
          onClose={() => setEditingBuilding(null)}
          onSaved={handleBuildingSaved}
          onDeleted={handleBuildingDeleted}
        />
      )}
    </>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [routes, setRoutes] = useState([]);
  const [modal, setModal] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchRoutes = async () => {
    try {
      const res = await fetch(`${API}/routes`);
      if (!res.ok) throw new Error();
      setRoutes(await res.json());
    } catch { setRoutes([]); }
  };

  useEffect(() => { fetchRoutes(); }, []);

  useEffect(() => {
    const handler = () => setDropdownOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/routes/${id}`, { method: "DELETE" });
      setRoutes(r => r.filter(x => x.id !== id));
    } catch {}
  };

  const openModal = (type) => { setModal(type); setDropdownOpen(false); };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <div className="logo">basic<span>mapper</span></div>
          <div className="header-right">
            <div className="live-dot">LIVE · localhost:8080</div>
            <div className="dropdown-wrap" onClick={e => e.stopPropagation()}>
              <button className="btn-new" onClick={() => setDropdownOpen(o => !o)}>+ New ▾</button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => openModal("route")}>
                    <span className="di-icon">◈</span> Route
                  </div>
                  <div className="dropdown-item" onClick={() => openModal("building")}>
                    <span className="di-icon">▣</span> Building
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="main">
          <div className="board-header">
            <div className="board-title">Route <span>Overview</span></div>
            <div className="board-meta">{routes.length} route{routes.length !== 1 ? "s" : ""} total</div>
          </div>
          <div className="kanban">
            {routes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-glyph">//</div>
                <div className="empty-text">No routes found. Create one to get started.</div>
              </div>
            ) : (
              routes.map(route => (
                <RouteCard key={route.id} route={route} routes={routes} onDelete={handleDelete} />
              ))
            )}
          </div>
        </main>
      </div>

      {modal === "route" && (
        <CreateRouteModal onClose={() => setModal(null)} onCreated={r => setRoutes(p => [...p, r])} />
      )}
      {modal === "building" && (
        <BuildingModal onClose={() => setModal(null)} onSaved={() => {}} onDeleted={() => {}} routes={routes} />
      )}
    </>
  );
}
