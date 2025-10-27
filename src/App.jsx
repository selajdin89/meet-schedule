import { useState } from "react";
import "./App.css";

function App() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		meetingDate: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const bookingUrl = "https://oncehub.com/PAGE-EF07E539C1";

	const handleSubmit = (e) => {
		e.preventDefault();

		// Build URL with pre-filled data
		const params = new URLSearchParams({
			firstName: formData.firstName,
			lastName: formData.lastName,
		});

		const fullBookingUrl = `${bookingUrl}?${params.toString()}`;

		console.log("Opening booking page:", fullBookingUrl);

		// Open in centered popup window
		const width = 800;
		const height = 700;
		const left = (window.screen.width - width) / 2;
		const top = (window.screen.height - height) / 2;

		window.open(
			fullBookingUrl,
			"OnceHub Booking",
			`width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
		);

		// Reset form after opening popup
		setFormData({
			firstName: "",
			lastName: "",
			meetingDate: "",
		});
	};

	return (
		<div className="app-container">
			<div className="form-container">
				<h1>Schedule a Meeting</h1>
				<p className="subtitle">
					Fill out the form below to schedule your meeting
				</p>

				<form onSubmit={handleSubmit} className="meeting-form">
					<div className="form-group">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							required
							placeholder="Enter your first name"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							required
							placeholder="Enter your last name"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="meetingDate">Meeting Date</label>
						<input
							type="date"
							id="meetingDate"
							name="meetingDate"
							value={formData.meetingDate}
							onChange={handleChange}
							required
							min={new Date().toISOString().split("T")[0]}
						/>
					</div>

					<div className="info-box">
						💡 Click the button below to open the OnceHub booking calendar
					</div>

					<button type="submit" className="submit-button">
						Schedule Meeting
					</button>
				</form>
			</div>
		</div>
	);
}

export default App;
