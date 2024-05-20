import React, { useState } from "react";
import forge from "node-forge";

const DecryptMessage = () => {
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      <div>
        <h3>Decrypted Message</h3>
        <textarea value={decryptedMessage} readOnly />
      </div>
    </div>
  );
};

export default DecryptMessage;
