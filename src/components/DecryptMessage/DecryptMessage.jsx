import React, { useState } from "react";
import forge from "node-forge";

const DecryptMessage = () => {
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const decryptMessage = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        const receiverPrivateKey = forge.pki.privateKeyFromPem(privateKey);
        const encryptedBytes = forge.util.decode64(encryptedMessage);
        const decrypted = receiverPrivateKey.decrypt(
          encryptedBytes,
          "RSA-OAEP"
        );
        setDecryptedMessage(decrypted);
      } catch (error) {
        setDecryptedMessage("Decryption failed. Please check your inputs.");
      } finally {
        setLoading(false);
      }
    }, 100);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(""), 2000);
      },
      (err) => {
        setCopyStatus("Failed to copy");
        setTimeout(() => setCopyStatus(""), 2000);
      }
    );
  };

  return (
    <div>
      <h2>Decrypt Message</h2>
      <textarea
        placeholder="Encrypted Message"
        value={encryptedMessage}
        onChange={(e) => setEncryptedMessage(e.target.value)}
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
      <textarea
        placeholder="Signer's Public Key"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
      />
      <button onClick={decryptMessage} disabled={loading}>
        {loading ? "Decrypting..." : "Decrypt"}
      </button>
      {loading && <p>Decrypting, please wait...</p>}
      <div style={{ position: "relative" }}>
        <h3>Decrypted Message</h3>
        <textarea value={decryptedMessage} readOnly />
        <button
          className="copy-button"
          onClick={() => copyToClipboard(decryptedMessage)}
        >
          c
        </button>
        {copyStatus && <span>{copyStatus}</span>}
      </div>
    </div>
  );
};

export default DecryptMessage;
