import React, { useEffect, useState } from 'react';
import { getCount } from '../services/api';

const StudentCount: React.FC = () => {
  const [count, setCount] = useState<String | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getCount();
        setCount(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!count) return <div className="alert alert-warning">Count not found</div>;

  return (
    <div className="container">
      <h1>Student Count</h1>
      <p>{count?.toString()}</p>
    </div>
  );
};

export default StudentCount;
