# SUM Tool

A simple and secure Key Generator, Encryption, and Decryption tool using RSA. This tool allows users to generate RSA key pairs, encrypt messages, and decrypt messages using RSA encryption, all within a user-friendly interface.

## Features

- **Key Generation**: Generate RSA key pairs with a specified name, email, and passphrase.
- **Encryption**: Encrypt messages using a provided public key.
- **Decryption**: Decrypt messages using a provided private key.
- **Client-side Operations**: All operations are performed client-side for enhanced security.
- **Copy to Clipboard**: Copy generated keys to the clipboard for easy use.

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/sum-tool.git
   cd sum-tool
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the application**:
   ```sh
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Usage

### Key Generation

1. Go to the **Generate Key** tab.
2. Enter your name, email, and passphrase.
3. Click the **Generate Keys** button.
4. Copy the generated public and private keys using the copy button next to each key.

### Encryption

1. Go to the **Encrypt** tab.
2. Enter the message you want to encrypt.
3. Enter the receiver's public key.
4. Enter your private key and passphrase.
5. Click the **Encrypt** button to get the encrypted message.

### Decryption

1. Go to the **Decrypt** tab.
2. Enter the encrypted message.
3. Enter your private key and passphrase.
4. Enter the signer's public key (optional for signature verification).
5. Click the **Decrypt** button to get the decrypted message.
