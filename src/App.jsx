import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import apiKey from './config';
import Nav from './components/Nav';
import Search from './components/Search';
import PhotoList from './components/PhotoList';
import NotFound from './components/NotFound';
import './index.css';

function App() {
	const [photos, setPhotos] = useState({
		cats: [],
		dogs: [],
		computers: [],
		searchResults: []
	});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	
	// Use a ref to track if we've initiated loading for each route
	const loadingInitiated = useRef({
		'/cats': false,
		'/dogs': false,
		'/computers': false
	});

	// Function to fetch data from Pixabay API
	const fetchData = async (query, category = 'searchResults') => {
		setLoading(true);
		try {
			const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=24`);
			const data = await response.json();
			
			setPhotos(prevPhotos => ({
				...prevPhotos,
				[category]: data.hits
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	// Function to handle search submissions
	const handleSearch = (query) => {
		fetchData(query);
		navigate(`/search/${query}`);
	};

	// Initial data load based on current route
	useEffect(() => {
		const path = location.pathname;
		
		if (path === '/' || path === '/cats') {
			if (photos.cats.length === 0 && !loadingInitiated.current['/cats']) {
				loadingInitiated.current['/cats'] = true;
				fetchData('cats', 'cats');
			} else {
				setLoading(false);
			}
		} else if (path === '/dogs') {
			if (photos.dogs.length === 0 && !loadingInitiated.current['/dogs']) {
				loadingInitiated.current['/dogs'] = true;
				fetchData('dogs', 'dogs');
			} else {
				setLoading(false);
			}
		} else if (path === '/computers') {
			if (photos.computers.length === 0 && !loadingInitiated.current['/computers']) {
				loadingInitiated.current['/computers'] = true;
				fetchData('computers', 'computers');
			} else {
				setLoading(false);
			}
		} else if (path.startsWith('/search/')) {
			const query = path.split('/search/')[1];
			if (query) {
				fetchData(query);
			} else {
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
		
		// This effect runs when location changes
	}, [location.pathname]);

	return (
		<div className="container">
			<Search onSearch={handleSearch} />
			<Nav />
			
			{loading ? (
				<div className="loading">...Loading</div>
			) : (
				// In App.jsx:
				<Routes>
					<Route path="/" element={<Navigate to="/cats" />} />
					<Route path="/cats" element={<PhotoList data={photos.cats} title="Cats" />} />
					<Route path="/dogs" element={<PhotoList data={photos.dogs} title="Dogs" />} />
					<Route path="/computers" element={<PhotoList data={photos.computers} title="Computers" />} />
					<Route path="/search/:query" element={<PhotoList data={photos.searchResults} title="Search Results" />} />
					{/* Make sure we're explicitly setting routeError to true */}
					<Route path="*" element={<NotFound routeError={true} />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
