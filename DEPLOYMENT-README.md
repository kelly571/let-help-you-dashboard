# DEKEMEDS - Portable Static Bundle Instructions

This bundle contains the full DEKEMEDS application as a **fully portable static website**. It is optimized for both online hosting and local offline use.

## 🚀 How to use this bundle locally:
1. **Extract** the contents of the `dist` folder.
2. **Double-click** the `index.html` file in any modern web browser (Chrome, Safari, Firefox).
3. The application is configured with `base: './'` and `HashRouter`, meaning it works perfectly without a web server. All assets (JS, CSS, Images) are loaded relatively.

## 📲 How to "Download" as an App (PWA):
1. **Host** the `dist` folder on any HTTPS server (Netlify, Vercel, GitHub Pages).
2. **On iPhone (Safari)**: Tap the **Share** icon -> **"Add to Home Screen"**.
3. **On Android (Chrome)**: Tap the **Three Dots** -> **"Install App"**.
4. The website will now appear on your home screen and behave like a native mobile application.

## ☁️ How to deploy this website:
Simply upload the contents of the `dist` folder to:
- **Netlify**: Drop the folder in the Netlify dashboard.
- **GitHub Pages**: Push the files to a `gh-pages` branch.
- **Vercel**: Deploy using the Vercel CLI or dashboard.

## 📂 Project Structure:
- `index.html`: The entry point (run this!).
- `assets/`: Optimized JavaScript and CSS files.
- `manifest.json`: Web App Manifest for mobile installation.
- `favicon.ico`: App icon.

## 🛡️ Admin & Security:
- All logic is client-side. To enable persistent orders across multiple devices, connect a backend service like Supabase.
- Current payment recipient: **Kelly Mwendwa (0726107003)**.

---
*Created with focus on portability and performance.*