# GitHub Setup Guide

## Steps to Push to GitHub:

### 1. Initialize Git Repository (if not already done)

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Commit Files

```bash
git commit -m "Initial commit: Meeting Scheduler app with OnceHub integration"
```

### 4. Create Repository on GitHub

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Click "New repository"
4. Name it: `meeting-scheduler` or `oncehub-booking-app`
5. Choose Public or Private
6. **Don't** initialize with README (we already have one)
7. Click "Create repository"

### 5. Add GitHub Remote

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

Replace:

- `YOUR_USERNAME` with your GitHub username
- `REPO_NAME` with your repository name

### 6. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Next Steps:

### Add to Portfolio

You can showcase this project by:

- Adding a live demo link (if you deploy it)
- Adding screenshots
- Describing what you learned

### Deploy (Optional)

Deploy your app using:

- **Vercel**: Connect your GitHub repo
- **Netlify**: Connect your GitHub repo
- **GitHub Pages**: For static hosting

## Repository Ready!

Your project is now ready to share on GitHub! 🎉
