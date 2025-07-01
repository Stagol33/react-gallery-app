// src/components/NotFound.jsx
function NotFound({ routeError = false }) {
	if (routeError) {
		// Return a completely different styled 404 page
		return (
			<div className="error-404">
				<h1>404</h1>
				<div className="error-content">
					<h2>Page Not Found</h2>
					<p>Oops! The page you're looking for doesn't exist or has been moved.</p>
					<a href="/" className="error-home-link">Return to Gallery</a>
				</div>
			</div>
		);
	}
	
	// Return the standard "no results found" message for search results
	return (
		<div className="not-found">
			<h3>No Results Found</h3>
			<p>Your search did not return any results. Please try again.</p>
		</div>
	);
}

export default NotFound;
