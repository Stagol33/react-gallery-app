// src/components/Modal.jsx
import { useEffect } from 'react';
import '../styles/Modal.css';

function Modal({ isOpen, onClose, children }) {
	useEffect(() => {
		// Prevent scrolling on body when modal is open
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		
		// Add escape key listener
		const handleEscape = (e) => {
			if (e.key === 'Escape') onClose();
		};
		
		window.addEventListener('keydown', handleEscape);
		return () => {
			window.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close" onClick={onClose}>×</button>
				{children}
			</div>
		</div>
	);
}

export default Modal;
