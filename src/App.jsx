// import { useState } from "react";
// import "./App.css";

// function App() {
// 	const [formData, setFormData] = useState({
// 		firstName: "",
// 		lastName: "",
// 		meetingDate: "",
// 	});

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prevData) => ({
// 			...prevData,
// 			[name]: value,
// 		}));
// 	};

// 	const bookingUrl = "https://oncehub.com/PAGE-EF07E539C1";

// 	const handleSubmit = (e) => {
// 		e.preventDefault();

// 		// Build URL with pre-filled data
// 		const params = new URLSearchParams({
// 			firstName: formData.firstName,
// 			lastName: formData.lastName,
// 		});

// 		const fullBookingUrl = `${bookingUrl}?${params.toString()}`;

// 		console.log("Opening booking page:", fullBookingUrl);

// 		// Open in centered popup window
// 		const width = 800;
// 		const height = 700;
// 		const left = (window.screen.width - width) / 2;
// 		const top = (window.screen.height - height) / 2;

// 		window.open(
// 			fullBookingUrl,
// 			"OnceHub Booking",
// 			`width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
// 		);

// 		// Reset form after opening popup
// 		setFormData({
// 			firstName: "",
// 			lastName: "",
// 			meetingDate: "",
// 		});
// 	};

// 	return (
// 		<div className="app-container">
// 			<div className="form-container">
// 				<h1>Schedule a Meeting</h1>
// 				<p className="subtitle">
// 					Fill out the form below to schedule your meeting
// 				</p>

// 				<form onSubmit={handleSubmit} className="meeting-form">
// 					<div className="form-group">
// 						<label htmlFor="firstName">First Name</label>
// 						<input
// 							type="text"
// 							id="firstName"
// 							name="firstName"
// 							value={formData.firstName}
// 							onChange={handleChange}
// 							required
// 							placeholder="Enter your first name"
// 						/>
// 					</div>

// 					<div className="form-group">
// 						<label htmlFor="lastName">Last Name</label>
// 						<input
// 							type="text"
// 							id="lastName"
// 							name="lastName"
// 							value={formData.lastName}
// 							onChange={handleChange}
// 							required
// 							placeholder="Enter your last name"
// 						/>
// 					</div>

// 					<div className="form-group">
// 						<label htmlFor="meetingDate">Meeting Date</label>
// 						<input
// 							type="date"
// 							id="meetingDate"
// 							name="meetingDate"
// 							value={formData.meetingDate}
// 							onChange={handleChange}
// 							required
// 							min={new Date().toISOString().split("T")[0]}
// 						/>
// 					</div>

// 					<div className="info-box">
// 						💡 Click the button below to open the OnceHub booking calendar
// 					</div>

// 					<button type="submit" className="submit-button">
// 						Schedule Meeting
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }

// export default App;

import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
	});
	const [showCalendar, setShowCalendar] = useState(false);
	const [loading, setLoading] = useState(false);
	const [iframeReady, setIframeReady] = useState(false);

	// Preconnect + DNS Prefetch to OnceHub
	useEffect(() => {
		const domains = ["https://oncehub.com", "https://go.oncehub.com"];
		domains.forEach((domain) => {
			const preconnect = document.createElement("link");
			preconnect.rel = "preconnect";
			preconnect.href = domain;
			document.head.appendChild(preconnect);

			const dns = document.createElement("link");
			dns.rel = "dns-prefetch";
			dns.href = domain;
			document.head.appendChild(dns);
		});
	}, []);

	// Preload hidden iframe in background
	useEffect(() => {
		const preloadFrame = document.createElement("iframe");
		preloadFrame.src = "https://oncehub.com/PAGE-EF07E539C1?embed_type=inline";
		preloadFrame.style.display = "none";
		preloadFrame.onload = () => setIframeReady(true);
		document.body.appendChild(preloadFrame);

		return () => document.body.removeChild(preloadFrame);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setShowCalendar(true);
		setLoading(true);
	};

	// Prefill values via query params
	const bookingUrl = `https://oncehub.com/PAGE-EF07E539C1?name=${encodeURIComponent(
		formData.name
	)}&email=${encodeURIComponent(formData.email)}&embed_type=inline`;

	return (
		<div className="app-container">
			<div className="form-container">
				<h1>Schedule a Meeting</h1>
				<p className="subtitle">
					Enter your name and email to schedule a meeting
				</p>

				{/* FORM */}
				{!showCalendar && (
					<form onSubmit={handleSubmit} className="meeting-form">
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								placeholder="Enter your full name"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								placeholder="Enter your email"
							/>
						</div>

						<button type="submit" className="submit-button">
							Proceed with booking
						</button>
					</form>
				)}

				{/* CALENDAR */}
				{showCalendar && (
					<div className="calendar-wrapper">
						{loading && (
							<div className="loader-overlay">
								<div className="spinner"></div>
								<p>Loading calendar...</p>
							</div>
						)}

						<iframe
							title="OnceHub Booking"
							src={bookingUrl}
							width="100%"
							height="700"
							frameBorder="0"
							allow="payment"
							onLoad={() => setLoading(false)}
							style={{
								minWidth: "320px",
								borderRadius: "10px",
								opacity: loading ? 0 : 1,
								transition: "opacity 0.5s ease-in-out",
								display: "block",
							}}
						></iframe>
					</div>
				)}

				{/* Small visual feedback if iframe was preloaded */}
				{!showCalendar && iframeReady && (
					<p className="note">⚡ Calendar preloaded — it will open faster!</p>
				)}
			</div>
		</div>
	);
}

export default App;
