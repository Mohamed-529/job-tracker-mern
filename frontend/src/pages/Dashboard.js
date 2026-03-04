import React, { useState, useEffect } from "react";
import API from "../api";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ company: "", position: "" });

  const fetchJobs = async () => {
    const res = await API.get("/jobs");
    setJobs(res.data);
  };

  useEffect(() => { fetchJobs(); }, []);

  const addJob = async (e) => {
    e.preventDefault();
    await API.post("/jobs", form);
    setForm({ company: "", position: "" });
    fetchJobs();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/jobs/${id}`, { status });
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await API.delete(`/jobs/${id}`);
    fetchJobs();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const count = (status) => jobs.filter(j => j.status === status).length;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Job Tracker Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Add Job</h3>
      <form onSubmit={addJob}>
        <input placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <input placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })} />
        <button type="submit">Add</button>
      </form>

      <h3>Statistics</h3>
      <p>Applied: {count("Applied")}</p>
      <p>Interview: {count("Interview")}</p>
      <p>Rejected: {count("Rejected")}</p>
      <p>Offer: {count("Offer")}</p>

      <h3>All Applications</h3>
      {jobs.map(job => (
        <div key={job._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><b>{job.company}</b> - {job.position}</p>
          <select value={job.status}
            onChange={(e) => updateStatus(job._id, e.target.value)}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>
          <button onClick={() => deleteJob(job._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;