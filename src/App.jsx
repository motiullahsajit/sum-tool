import { useState } from "react";
import DecryptMessage from "./components/DecryptMessage/DecryptMessage";
import EncryptMessage from "./components/EncryptMessage/EncryptMessage";
import KeyGenerator from "./components/KeyGenerator/KeyGenerator";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("generate");

  const renderTab = () => {
    switch (activeTab) {
      case "generate":
        return <KeyGenerator />;
      case "encrypt":
        return <EncryptMessage />;
      case "decrypt":
        return <DecryptMessage />;
      default:
        return <KeyGenerator />;
    }
  };

  return (
    <div className="App">
      <h1>SUM Tool</h1>
      <p>A simple and secure Key Generator, Encryption and Decryption tool.</p>
      <nav>
        <ul>
          <li
            className={activeTab === "generate" ? "active" : ""}
            onClick={() => setActiveTab("generate")}
          >
            Generate Key
          </li>
          <li
            className={activeTab === "encrypt" ? "active" : ""}
            onClick={() => setActiveTab("encrypt")}
          >
            Encrypt
          </li>
          <li
            className={activeTab === "decrypt" ? "active" : ""}
            onClick={() => setActiveTab("decrypt")}
          >
            Decrypt
          </li>
        </ul>
      </nav>
      <div className="tab-content">{renderTab()}</div>
    </div>
  );
}

export default App;
