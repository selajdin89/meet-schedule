import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Booking API endpoint - BEFORE static files
app.post("/api/bookings", async (req, res) => {
	try {
		const { firstName, lastName, meetingDate } = req.body;
		const apiKey =
			process.env.ONCEHUB_API_KEY || "5f6a2109b1a8710fef2437bfd0e02017";
		const bookingPageId = "PAGE-A61F541AFF";

		console.log("\n=== NEW BOOKING REQUEST ===");
		console.log("Name:", firstName, lastName);
		console.log("Date:", meetingDate);
		console.log("API Key:", apiKey);
		console.log("Booking Page ID:", bookingPageId);

		// Format the date
		const formattedDate = new Date(meetingDate).toISOString();

		// Payload to send to OnceHub
		const bookingPayload = {
			bookingpage_id: bookingPageId,
			contact: {
				firstname: firstName,
				lastname: lastName,
			},
			start_time: formattedDate,
		};

		console.log("Sending to OnceHub:", bookingPayload);

		// Send to OnceHub API
		const response = await fetch("https://api.oncehub.com/v2/bookings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"API-Key": apiKey,
			},
			body: JSON.stringify(bookingPayload),
		});

		const data = await response.json();
		console.log("OnceHub Response Status:", response.status);
		console.log("OnceHub Response Data:", data);

		// Return response to frontend
		if (response.ok) {
			return res.json({
				success: true,
				data: data,
				message: "Booking created successfully!",
			});
		} else {
			return res.json({
				success: false,
				error: data.message || "Failed to create booking",
				details: data,
			});
		}
	} catch (error) {
		console.error("Error processing booking:", error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
});

app.listen(PORT, () => {
	console.log("\n🚀 Server running on http://localhost:" + PORT);
	console.log("📡 Backend ready to handle booking requests!");
	console.log(
		"API Key:",
		process.env.ONCEHUB_API_KEY || "5f6a2109b1a8710fef2437bfd0e02017"
	);
	console.log("\n");
});
