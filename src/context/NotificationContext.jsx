import { createContext, useContext, useState } from 'react';
import './NotificationContext.css';

const NotiContext = createContext(null);
export const useNotification = () => useContext(NotiContext);

export function NotificationProvider({ children }) {
  const [notifs, setNotifs] = useState([]);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifs(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 4000);
  };

  const removeNotification = (id) =>
    setNotifs(prev => prev.filter(n => n.id !== id));

  return (
    <NotiContext.Provider value={{ addNotification }}>
      {children}
      <div className="toast-container">
        {notifs.map(n => (
          <div key={n.id} className={`toast toast-${n.type}`} onClick={() => removeNotification(n.id)}> {n.message} </div>
        ))}
      </div>
    </NotiContext.Provider>
  );
}