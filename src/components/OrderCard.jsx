import { useState } from 'react';
import { acceptOrder, rejectOrder, markPickedUp, markDelivered } from '../api/client';

const OrderCard = ({ order, onUpdated, pulse }) => {
  const [busy, setBusy] = useState(false);

  const runAction = async (fn) => {
    setBusy(true);
    try {
      await fn(order.id);
      onUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`chit-card bg-white rounded-lg border border-clay/15 p-4 ${pulse ? 'animate-pulseRing' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="font-display text-lg text-ink">Order #{order.id}</p>
        <span className="font-mono text-sm text-clay">₹{Number(order.total_amount).toFixed(0)}</span>
      </div>

      <p className="font-body text-sm text-ink mb-1">{order.customer_name || 'Customer'}</p>
      <p className="font-body text-xs text-clay mb-3">{order.delivery_address}</p>

      {order.status === 'assigned' && (
        <div className="flex gap-2">
          <button
            onClick={() => runAction(rejectOrder)}
            disabled={busy}
            className="flex-1 py-2.5 rounded-md font-body text-sm font-medium border border-chili text-chili disabled:opacity-50"
          >
            Reject
          </button>
          <button
            onClick={() => runAction(acceptOrder)}
            disabled={busy}
            className="flex-1 py-2.5 rounded-md font-body text-sm font-semibold bg-chutney text-paper disabled:opacity-50"
          >
            Accept
          </button>
        </div>
      )}

      {order.status === 'accepted' && (
        <button
          onClick={() => runAction(markPickedUp)}
          disabled={busy}
          className="w-full py-2.5 rounded-md font-body text-sm font-semibold bg-saffron text-tandoor disabled:opacity-50"
        >
          Mark Picked Up
        </button>
      )}

      {order.status === 'picked_up' && (
        <button
          onClick={() => runAction(markDelivered)}
          disabled={busy}
          className="w-full py-2.5 rounded-md font-body text-sm font-semibold bg-chili text-paper disabled:opacity-50"
        >
          Mark Delivered
        </button>
      )}
    </div>
  );
};

export default OrderCard;
