import { Boxes, Clock, CheckCircle2, RotateCcw } from "lucide-react";
import StatCard from "../components/StatCard";
import { equipmentList, requestList } from "../data/mockData";

function Dashboard() {
  const totalEquipment = equipmentList.length;
  const availableItems = equipmentList.filter((item) => item.available > 0).length;
  const pendingRequests = requestList.filter((req) => req.status === "Pending").length;
  const returnedItems = requestList.filter((req) => req.status === "Returned").length;

  return (
    <main className="page">
      <section className="heroSection">
        <div>
          <p className="eyebrow">School Equipment Lending Portal</p>
          <h1>Manage equipment borrowing without messy registers.</h1>
          <p>
            Track availability, borrowing requests, approvals, and returns from one clean dashboard.
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
            <h2>Latest Borrowing Requests</h2>
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
              {requestList.map((request) => (
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
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;