import { PackageCheck, Send } from "lucide-react";

function EquipmentCard({ item, onRequest }) {
  const available = item.available > 0;

  return (
    <article className="equipmentCard">
      <div className="equipmentImageWrap">
        <img src={item.image} alt={item.name} className="equipmentImage" />
        <span className={available ? "badge success" : "badge danger"}>
          {available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="equipmentBody">
        <div>
          <p className="category">{item.category}</p>
          <h3>{item.name}</h3>
        </div>

        <div className="metaGrid">
          <span>Condition</span>
          <strong>{item.condition}</strong>
          <span>Quantity</span>
          <strong>{item.quantity}</strong>
          <span>Available</span>
          <strong>{item.available}</strong>
        </div>

        <button className="primaryBtn" disabled={!available} onClick={() => onRequest(item.id)}>
          {available ? <Send size={16} /> : <PackageCheck size={16} />}
          {available ? "Request Item" : "Not Available"}
        </button>
      </div>
    </article>
  );
}

export default EquipmentCard;