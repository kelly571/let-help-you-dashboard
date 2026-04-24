# Plan: Finalize Downloadable Static Website

Goal: Ensure the application is perfectly prepared as a portable static bundle that can be downloaded, run locally from the file system, or hosted on any static service.

## 1. Build Configuration (Vite)
- Update `vite.config.ts`: Add `base: './'` to enable relative asset paths. This is the single most important change for a "downloadable" website to work locally via `index.html`.

## 2. Manifest & App Identity
- Create `public/manifest.json`: Define the app name, icons, and display mode (standalone) to make the site "installable" on mobile and desktop.
- Update `index.html`:
    - Link the `manifest.json`.
    - Update meta tags for `mobile-web-app-capable` and `apple-mobile-web-app-capable`.
    - Ensure favicon paths are relative (`./favicon.ico`).

## 3. UI Enhancements for "Downloadability"
- Update `src/App.tsx`:
    - Add a "Download Instructions" section or tooltip in the footer.
    - Enhance the "Share" feature to explain that the app can be added to the home screen.
    - Ensure the "Secure Static Bundle" status in the footer is visually appealing.

## 4. Documentation
- Update `DEPLOYMENT-README.md`:
    - Provide clear steps on how to download the project (Build -> Zip dist -> Share).
    - Add instructions for users on how to "Install" the app on their phone (Add to Home Screen).

## 5. Verification
- Validate the build output.
- Ensure all images and icons are correctly referenced.
