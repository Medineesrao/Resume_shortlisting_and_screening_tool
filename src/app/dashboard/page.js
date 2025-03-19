import Sidebar from "../../../components/sidebar/Sidebar";
import BatchesTable from "../../../components/batchtable/BatchesTable";
import "../globals.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <BatchesTable />
      </div>
    </div>
  );
}
