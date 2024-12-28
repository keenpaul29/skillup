import { useEffect, useState } from 'react';
import axios from 'axios';

interface FormSubmission {
    _id: string;
    username: string;
    email: string;
    phonenumber: string;
    qualification: string;
    message: string;
}

const useFetchFormData = () => {
    const [formData, setFormData] = useState<FormSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/form-data');
                const data = Array.isArray(response.data) ? response.data : [];
                setFormData(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { formData, loading, error };
};

export default useFetchFormData;
