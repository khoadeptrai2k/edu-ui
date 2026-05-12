import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getDataAPI, patchDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { getErrorMessage } from "../utils/errorMessage";

const editableFields = ["fullname", "username", "email", "role", "aiLearningFocus", "isActive"];

const Admin = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  const canManage = auth.user?.role === "admin";

  const filteredStats = useMemo(() => ({
    total: users.length,
    admins: users.filter((user) => user.role === "admin").length,
    ai: users.filter((user) => user.aiEnabled).length,
    paid: users.filter((user) => user.premiumPayment?.status === "paid").length,
  }), [users]);

  const loadUsers = async (value = search) => {
    if (!auth.token || !canManage) return;
    setLoading(true);
    try {
      const res = await getDataAPI(`admin/users?limit=80&search=${encodeURIComponent(value)}`, auth.token);
      setUsers(res.data.users);
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: getErrorMessage(err) } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token, canManage]);

  if (!canManage) return <Navigate to="/" replace />;

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsers(search);
  };

  const beginEdit = (user) => {
    setEditing({
      ...user,
      aiLearningFocus: user.aiLearningFocus || "general",
    });
  };

  const patchUser = async (id, data) => {
    try {
      const res = await patchDataAPI(`admin/users/${id}`, data, auth.token);
      setUsers((current) => current.map((user) => user._id === id ? res.data.user : user));
      setEditing(null);
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: getErrorMessage(err) } });
    }
  };

  const saveEditing = (e) => {
    e.preventDefault();
    const data = {};
    editableFields.forEach((field) => { data[field] = editing[field]; });
    data.aiEnabled = Boolean(editing.aiEnabled);
    patchUser(editing._id, data);
  };

  return (
    <main className="admin_page">
      <section className="admin_hero">
        <div>
          <p>User Management</p>
          <h1>Accounts, roles, and learning AI access</h1>
        </div>
        <div className="admin_stats">
          <span><strong>{filteredStats.total}</strong> users</span>
          <span><strong>{filteredStats.admins}</strong> admins</span>
          <span><strong>{filteredStats.ai}</strong> AI enabled</span>
          <span><strong>{filteredStats.paid}</strong> paid</span>
        </div>
      </section>

      <form className="admin_toolbar" onSubmit={handleSearch}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search username, fullname, or email"
        />
        <button>{loading ? "Searching..." : "Search"}</button>
      </form>

      <section className="admin_table">
        {users.map((user) => (
          <article key={user._id} className="admin_user">
            <div>
              <img src={user.avatar} alt={user.username} />
              <div>
                <h3>{user.username}</h3>
                <p>{user.fullname}</p>
                <small>{user.email}</small>
              </div>
            </div>

            <div className="admin_badges">
              <span>{user.role}</span>
              <span>{user.isActive === false ? "deactivated" : "active"}</span>
              {user.aiEnabled && <span>Premium AI</span>}
              {user.premiumPayment?.status && <span>payment: {user.premiumPayment.status}</span>}
              <span>{user.aiLearningFocus || "general"}</span>
            </div>

            <button type="button" onClick={() => beginEdit(user)}>Manage</button>
          </article>
        ))}
      </section>

      {editing && (
        <div className="admin_modal">
          <form className="admin_editor" onSubmit={saveEditing}>
            <div className="admin_editor_head">
              <h2>Manage account</h2>
              <button type="button" onClick={() => setEditing(null)}>&times;</button>
            </div>

            <label>Full name</label>
            <input value={editing.fullname || ""} onChange={(e) => setEditing({...editing, fullname: e.target.value})} />

            <label>Username</label>
            <input value={editing.username || ""} onChange={(e) => setEditing({...editing, username: e.target.value})} />

            <label>Email</label>
            <input value={editing.email || ""} onChange={(e) => setEditing({...editing, email: e.target.value})} />

            <label>Role</label>
            <select value={editing.role || "user"} onChange={(e) => setEditing({...editing, role: e.target.value})}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>

            <label className="admin_toggle">
              <input
                type="checkbox"
                checked={editing.isActive !== false}
                onChange={(e) => setEditing({...editing, isActive: e.target.checked})}
              />
              Account active
            </label>

            <label className="admin_toggle">
              <input
                type="checkbox"
                checked={Boolean(editing.aiEnabled)}
                onChange={(e) => setEditing({...editing, aiEnabled: e.target.checked})}
              />
              Enable Premium Learning AI
            </label>

            <label>AI learning focus</label>
            <input
              value={editing.aiLearningFocus || "general"}
              onChange={(e) => setEditing({...editing, aiLearningFocus: e.target.value})}
              placeholder="math, English, programming, exam prep..."
            />

            <p className="admin_note">
              Premium AI adds a premium tag to new posts and creates one automatic study-focused AI comment.
            </p>

            <div className="admin_payment_box">
              <strong>Payment</strong>
              <span>Status: {editing.premiumPayment?.status || "none"}</span>
              <span>Amount: {editing.premiumPayment?.amount || 0} {editing.premiumPayment?.currency || "usd"}</span>
              {editing.premiumPayment?.paidAt && <span>Paid: {new Date(editing.premiumPayment.paidAt).toLocaleString()}</span>}
              {editing.premiumPayment?.receiptUrl && (
                <a href={editing.premiumPayment.receiptUrl} target="_blank" rel="noreferrer" className="auth_link">
                  View Stripe receipt
                </a>
              )}
            </div>

            <button className="admin_save">Save changes</button>
          </form>
        </div>
      )}
    </main>
  );
};

export default Admin;
