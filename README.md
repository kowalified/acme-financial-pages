# acme-financial-pages

## ⚠️ Important Notes

- This is a **demo-only application**
- No real authentication or data persistence exists
- Forms use GET requests for simplicity
- API responses are static JSON

---

## 🚀 Deploying with Cloudflare Pages

This project is designed to be deployed using **Cloudflare Pages**.

### Option 1: GitHub Integration (Recommended)

1. Push this repo to GitHub
2. In Cloudflare:
   - Go to **Workers & Pages → Create Application**
   - Select **Pages → Connect to Git**
   - Choose this repository
3. Configure:
   - Build command: *(leave blank)*
   - Output directory: `/`
4. Deploy

Cloudflare will automatically redeploy on every push to the repository.

---

### Option 2: Direct Upload

You can also upload the files directly via Cloudflare Pages:

- Zip the contents of the repo
- Upload via Pages → Direct Upload

> Note: Git-based and Direct Upload projects are mutually exclusive.

---

## 🔐 Example Security Use Cases

This app supports demonstration of:

- Blocking malicious POST requests
- Protecting login endpoints from bots
- Applying stricter controls to high-risk actions (e.g., `/transfer`)
- Rate limiting API endpoints
- Using Workers for token-based access control
