import { useEffect, useState, useRef } from 'react';
import { getAssignedOrders, updateLocation } from '../api/client';
import { useAuth } from '../context/AuthContext';
import OrderCard from '../components/OrderCard';
import socket from '../socket';

const Orders = () => {
  const { partner } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newOrderId, setNewOrderId] = useState(null);
  const watchIdRef = useRef(null);

  const loadOrders = () => getAssignedOrders().then(({ data }) => setOrders(data.orders)).finally(() => setLoading(false));

  useEffect(() => {
    loadOrders();
  }, []);

  // Listen for new order alerts pushed by the backend in real-time
  useEffect(() => {
    const handleNewOrder = (order) => {
      setNewOrderId(order.id);
      loadOrders();
      setTimeout(() => setNewOrderId(null), 4000);
    };
    socket.on('new_order', handleNewOrder);
    return () => socket.off('new_order', handleNewOrder);
  }, []);

  // Live GPS tracking - only runs while there's an active order (accepted/picked_up)
  useEffect(() => {
    const hasActiveOrder = orders.some((o) => ['accepted', 'picked_up'].includes(o.status));

    if (hasActiveOrder && navigator.geolocation && !watchIdRef.current) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => updateLocation(pos.coords.latitude, pos.coords.longitude).catch(() => {}),
        (err) => console.warn('Location error', err),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
      );
    }

    if (!hasActiveOrder && watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [orders]);

  const isOffline = partner?.status === 'offline';

  return (
    <div className="px-4 py-5 pb-24">
      {isOffline && (
        <div className="bg-clay/10 border border-clay/20 rounded-lg p-4 mb-4 text-center">
          <p className="font-body text-sm text-clay">You're offline. Go online from the top bar to receive orders.</p>
        </div>
      )}

      <h1 className="font-display text-xl text-ink mb-4">
        {orders.length > 0 ? 'Your Orders' : 'Waiting for orders…'}
      </h1>

      {loading && <p className="font-body text-clay text-sm">Loading…</p>}

      {!loading && orders.length === 0 && !isOffline && (
        <p className="font-body text-clay text-sm">
          You're online. New orders will show up here automatically.
        </p>
      )}

      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onUpdated={loadOrders} pulse={order.id === newOrderId} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
