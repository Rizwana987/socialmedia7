import React, { useState, useEffect } from 'react';

const UserSearch = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300); // Adjust delay as necessary

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            handleSearch();
        } else {
            setUsers([]); // Clear users if query is empty
        }
    }, [debouncedQuery]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/users/search?q=${debouncedQuery}`);
            const data = await response.json();
            console.log('API Response:', data); // Log the data
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users..."
            />
            <ul>
                {users.length === 0 ? (
                    <li>No users found</li>
                ) : (
                    users.map(user => (
                        <li key={user._id}>{user.name} - {user.email}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default UserSearch;
