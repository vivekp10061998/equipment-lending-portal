import { requestList } from "../data/mockData";

function Requests() {
  return (
    <main className="page">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Borrowing Workflow</p>
          <h1>Track request status</h1>
        </div>
      </div>

      <section className="panel">
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
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
                  <td>#{request.id}</td>
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

export default Requests;