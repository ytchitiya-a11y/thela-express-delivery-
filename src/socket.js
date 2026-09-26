import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL, { autoConnect: false });

export const joinPartnerRoom = (partnerId) => {
  if (!socket.connected) socket.connect();
  socket.emit('join_room', { role: 'delivery_partner', id: partnerId });
};

export default socket;
