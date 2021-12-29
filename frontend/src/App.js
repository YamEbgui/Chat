import { useState } from "react";
import Chatroom from "./components/Chatroom";
import LoginCard from "./components/LoginCard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <div className="App">
      {!user && <LoginCard handleLogin={handleLogin} />}
      {user && <Chatroom user={user}></Chatroom>}
    </div>
  );
}

export default App;
