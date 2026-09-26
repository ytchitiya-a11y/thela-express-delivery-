import { useEffect, useState } from 'react';
import { getAssignedOrders } from '../api/client';

// Note: /delivery/orders returns non-completed orders by default per backend design.
// For a full history view, backend can add a ?status=delivered filter later;
// for now this screen shows whatever the same endpoint returns and totals it.
const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssignedOrders().then(({ data }) => setOrders(data.orders)).finally(() => setLoading(false));
  }, []);

  const delivered = orders.filter((o) => o.status === 'delivered');
  const earnings = delivered.reduce((sum, o) => sum + Number(o.total_amount) * 0.1, 0); // sample 10% commission model

  return (
    <div className="px-4 py-5 pb-24">
      <h1 className="font-display text-xl text-ink mb-4">History</h1>

      <div className="bg-white rounded-lg border border-clay/15 p-4 mb-5 flex justify-between">
        <div>
          <p className="font-body text-xs text-clay">Deliveries</p>
          <p className="font-display text-2xl text-ink">{delivered.length}</p>
        </div>
        <div>
          <p className="font-body text-xs text-clay">Est. Earnings</p>
          <p className="font-display text-2xl text-chutney">₹{earnings.toFixed(0)}</p>
        </div>
      </div>

      {loading && <p className="font-body text-clay text-sm">Loading…</p>}

      <div className="space-y-2">
        {delivered.map((order) => (
          <div key={order.id} className="bg-white rounded-lg border border-clay/15 p-3 flex justify-between items-center">
            <div>
              <p className="font-body text-sm text-ink">Order #{order.id}</p>
              <p className="font-body text-xs text-clay">{order.delivery_address}</p>
            </div>
            <span className="font-mono text-sm text-ink">₹{Number(order.total_amount).toFixed(0)}</span>
          </div>
        ))}
      </div>

      {!loading && delivered.length === 0 && (
        <p className="font-body text-clay text-sm">No completed deliveries yet.</p>
      )}
    </div>
  );
};

export default History;
