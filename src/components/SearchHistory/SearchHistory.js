import { memo } from 'react';
import { ReactComponent as DeleteGroupIcon } from "../../assets/images/menu-icon/Delete.svg";
import { ReactComponent as SearchGroupIcon } from "../../assets/images/menu-icon/Search.svg";
import './SearchHistory.css';

const SearchHistory = memo(({ history, onSearch, onDelete }) => {

    return (
        <div className="search-history">
            <h3>Search History</h3>
            <div className="history-list">
                {history.length > 0 ? (
                    history.map((item) => (
                        <div key={item.id} className="history-item">
                            <div className="history-content">
                                <div className="history-location">
                                    {item.location}
                                </div>
                                <div className="history-time">
                                    {new Date(item.time).toLocaleString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                            <div className="history-actions">
                                <button
                                    className="action-button search"
                                    onClick={() => onSearch(item.location)}
                                    title="Search again"
                                >
                                    <SearchGroupIcon />
                                </button>
                                <button
                                    className="action-button delete"
                                    onClick={() => onDelete(item.id)}
                                    title="Delete"
                                >
                                    <DeleteGroupIcon />
                                </button>
                            </div>
                        </div>
                    ))) : (
                    <div className="no-history">
                        <p>No Search Records.</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default SearchHistory; 