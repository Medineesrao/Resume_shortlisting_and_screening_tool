import "./Sidebar.css";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Recruit</h2>
      <ul className="menu">
        <li><Link href="/dashboard" className="menu-item">Dashboard</Link></li>
        <li><Link href="/batches" className="menu-item">Batches</Link></li>
        <li><Link href="/shortlisted" className="menu-item">Shortlisted Resumes</Link></li>
        <li><Link href="/assessments" className="menu-item">Ongoing Assessments</Link></li>
        <li><Link href="/settings" className="menu-item">Settings</Link></li>
      </ul>
      
      {/* Create Batch Button */}
      <button className="create-batch">Create Batch</button>

      {/* Logout Button (Now properly positioned inside sidebar) */}
      <div className="logout-container">
        <button className="logout">Logout</button>
      </div>
    </div>
  );
}
