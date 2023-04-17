import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './LeaderModal.css';


/**
 * LeaderModal is a React component that displays the top 10 entries of a leaderboard.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.data - The data for the leaderboard.
 * @param {Function} props.onClose - A function to close the modal.
 * @returns {JSX.Element} - A modal component that displays the leaderboard.
 */
function LeaderModal({ data, onClose }) {
  // Extract the leaderboard data from the props
  const [leaderboardData = {}] = data;
  const { leaderboard = [] } = leaderboardData;

  // Sort the leaderboard in descending order and take the top 10 entries
  const sortedLeaderboard = React.useMemo(() => (
    leaderboard.sort((a, b) => b.points - a.points).slice(0, 10)
  ), [leaderboard]);

  // Render the modal with the sorted leaderboard data
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Leaderboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {sortedLeaderboard.length > 0 ? (
          <ul>
            {sortedLeaderboard.map(({ user: { fullName }, points }, i) => (
              <li key={i}>
                <span>{fullName}</span>
                <span>{points}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No data to display.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LeaderModal;
