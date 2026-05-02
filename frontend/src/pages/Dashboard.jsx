import { useEffect, useState } from "react";
import { Boxes, Clock, CheckCircle2, RotateCcw } from "lucide-react";
import StatCard from "../components/StatCard";
import {
  getCurrentUser,
  getEquipment,
  getRequests
} from "../services/storageService";

function Dashboard() {
  const [equipment, setEquipment] = useState([]);
  const [requests, setRequests] = useState([]);

  const user = getCurrentUser();

  useEffect(() => {
    setEquipment(getEquipment());

    const allRequests = getRequests();

    if (user.role === "ADMIN") {
      setRequests(allRequests);
    } else {
      setRequests(allRequests.filter((request) => request.userId === user.id));
    }
  }, [user.id, user.role]);

  const totalEquipment = equipment.length;
  const availableItems = equipment.filter((item) => item.available > 0).length;
  const pendingRequests = requests.filter((req) => req.status === "Pending").length;
  const returnedItems = requests.filter((req) => req.status === "Returned").length;

  return (
    <main className="page">
      <section className="heroSection">
        <div>
          <p className="eyebrow">School Equipment Lending Portal</p>
          <h1>
            {user.role === "ADMIN"
              ? "Manage borrowing, approvals, and equipment inventory."
              : "Request school equipment and track your borrowing status."}
          </h1>
          <p>
            Logged in as {user.name} with {user.role} access.
          </p>
        </div>
      </section>

      <section className="statsGrid">
        <StatCard title="Total Equipment" value={totalEquipment} hint="Registered items" icon={<Boxes />} />
        <StatCard title="Available" value={availableItems} hint="Ready to borrow" icon={<CheckCircle2 />} />
        <StatCard title="Pending" value={pendingRequests} hint="Awaiting approval" icon={<Clock />} />
        <StatCard title="Returned" value={returnedItems} hint="Completed requests" icon={<RotateCcw />} />
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Recent Activity</p>
            <h2>{user.role === "ADMIN" ? "Latest Borrowing Requests" : "My Requests"}</h2>
          </div>
        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Requested By</th>
                <th>Role</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.equipmentName}</td>
                  <td>{request.requestedBy}</td>
                  <td>{request.role}</td>
                  <td>{request.date}</td>
                  <td>
                    <span className={`status ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan="5">No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;