import { useParams } from 'react-router-dom';
import Photo from './Photo';
import NotFound from './NotFound';

function PhotoList({ data, title }) {
	const { query } = useParams();
	
	return (
		<div className="photo-container">
			<h2>{query ? `Results for "${query}"` : title}</h2>
			
			{data && data.length > 0 ? (
				<ul>
					{data.map(photo => (
						<Photo key={photo.id} photo={photo} />
					))}
				</ul>
			) : (
				// Make sure we're explicitly setting routeError to false
				<NotFound routeError={false} />
			)}
		</div>
	);
}

export default PhotoList;
