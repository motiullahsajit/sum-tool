import React, { useState } from "react";
import forge from "node-forge";

const EncryptMessage = () => {
  const [message, setMessage] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const encryptMessage = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        const receiverPublicKey = forge.pki.publicKeyFromPem(publicKey);

        const encrypted = receiverPublicKey.encrypt(message, "RSA-OAEP");
        const encodedEncrypted = forge.util.encode64(encrypted);

        setEncryptedMessage(encodedEncrypted);
      } catch (error) {
        setEncryptedMessage("Encryption failed. Please check your inputs.");
      } finally {
        setLoading(false);
      }
    }, 100);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <h2>Encrypt Message</h2>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <textarea
        placeholder="Receiver's Public Key"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
      />
      <textarea
        placeholder="Your Private Key"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your Passphrase"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
      />
      <button onClick={encryptMessage} disabled={loading}>
        {loading ? "Encrypting..." : "Encrypt"}
      </button>
      {loading && <p>Encrypting, please wait...</p>}
      <div style={{ position: "relative" }}>
        <h3>Encrypted Message</h3>
        <textarea value={encryptedMessage} readOnly />
        <button
          onClick={() => copyToClipboard(encryptedMessage)}
          className="copy-button"
        >
          c
        </button>
      </div>
    </div>
  );
};

export default EncryptMessage;
