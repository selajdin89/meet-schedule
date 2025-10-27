# Meeting Scheduler

A modern React application for scheduling meetings with OnceHub integration. Users can fill out a form with their details and be redirected to a OnceHub booking calendar.

## 🚀 Features

- Clean, modern UI with gradient design
- Form validation for first name, last name, and meeting date
- Integration with OnceHub booking pages
- Pre-filled booking information via URL parameters
- Responsive design for mobile and desktop
- Popup window for seamless booking experience

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and development server
- **CSS3** - Styling with modern design

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/meet-scheduling.git
cd meet-scheduling
```

2. Install dependencies:

```bash
npm install
```

3. Configure your OnceHub booking page URL in `src/App.jsx`:

```javascript
const bookingUrl = "https://oncehub.com/YOUR-BOOKING-PAGE-ID";
```

4. Start the development server:

```bash
npm run dev
```

## 🔧 Configuration

### Setting up OnceHub

1. Create a booking page in your OnceHub account
2. Copy the public booking page URL
3. Update the `bookingUrl` constant in `src/App.jsx` with your URL

### Environment Variables (Optional)

Create a `.env.local` file if you want to store configuration:

```env
VITE_ONCEHUB_API_KEY=your_api_key_here
```

Note: Currently, the booking page URL is hardcoded. For environment variable support, you would need to update the code accordingly.

## 📝 Usage

1. Fill in the required fields:

   - First Name
   - Last Name
   - Meeting Date (must be in the future)

2. Click "Schedule Meeting"

3. A popup window will open with your OnceHub booking calendar

4. The form fields will be pre-filled with the name information you provided

5. Select your preferred time slot in the OnceHub interface

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🌐 Deployment

This project can be deployed to various platforms:

- **Vercel**: `npm install -g vercel && vercel`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the `gh-pages` package
- **Any static hosting**: Upload the `dist` folder

## 📄 License

MIT

## 👤 Author

Created for seamless meeting scheduling with OnceHub integration.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⚠️ Note About OnceHub API

OnceHub's API is designed for **reading** existing bookings, not creating them programmatically. This app uses OnceHub's public booking page interface with pre-filled data to provide the best user experience. For programmatic booking creation, consider alternative platforms like Calendly that support POST requests for booking creation.
