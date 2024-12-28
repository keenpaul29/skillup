import React from 'react';

const SubmittedData = ({ data }) => {
    return (
        <div className="mt-4 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-bold">Submitted Data</h3>
            <p><strong>Username:</strong> {data.username}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Phone Number:</strong> {data.phonenumber}</p>
            <p><strong>Qualification:</strong> {data.qualification}</p>
            <p><strong>Message:</strong> {data.message}</p>
        </div>
    );
};

export default SubmittedData;
