import React, { useState } from "react";
import forge from "node-forge";

const KeyGenerator = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [publicKeyPem, setPublicKeyPem] = useState("");
  const [privateKeyPem, setPrivateKeyPem] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState({
    publicKey: "",
    privateKey: "",
  });

  const generateKeys = () => {
    setLoading(true);
    setTimeout(() => {
      const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
      const privateKeyPemK = forge.pki.privateKeyToPem(privateKey);
      const publicKeyPemK = forge.pki.publicKeyToPem(publicKey);
      setPublicKeyPem(publicKeyPemK);
      setPrivateKeyPem(privateKeyPemK);
      setLoading(false);
    }, 100);
  };

  const copyToClipboard = (text, keyType) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyStatus({ ...copyStatus, [keyType]: "Copied!" });
        setTimeout(() => setCopyStatus({ ...copyStatus, [keyType]: "" }), 2000);
      },
      (err) => {
        setCopyStatus({ ...copyStatus, [keyType]: "Failed to copy" });
        setTimeout(() => setCopyStatus({ ...copyStatus, [keyType]: "" }), 2000);
      }
    );
  };

  return (
    <div>
      <h2>Generate RSA Key Pair</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passphrase"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />
        <button onClick={generateKeys} disabled={loading}>
          {loading ? "Generating..." : "Generate Keys"}
        </button>
      </div>
      {loading && <p>Generating keys, please wait...</p>}
      <div>
        <h3>Public Key</h3>
        <textarea value={publicKeyPem} readOnly />
        <button
          className="copy-button"
          onClick={() => copyToClipboard(publicKeyPem, "publicKey")}
        >
          C
        </button>
        {copyStatus.publicKey && <span>{copyStatus.publicKey}</span>}
      </div>
      <div>
        <h3>Private Key </h3>
        <textarea value={privateKeyPem} readOnly />
        <button
          className="copy-button"
          onClick={() => copyToClipboard(privateKeyPem, "privateKey")}
        >
          C
        </button>
        {copyStatus.privateKey && <span>{copyStatus.privateKey}</span>}
      </div>
    </div>
  );
};

export default KeyGenerator;
