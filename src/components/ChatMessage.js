import React from 'react';

const ChatMessage = ({ name, message }) => {
    return (
        <div className='flex items-center shadow-sm p-2'>
            <img
                className='h-8'
                alt="user"
                src="data:image/png;base64,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"
            />
            <span className='font-bold ml-1 mr-3'>{name}</span>
            <span>{message}</span>
        </div>

    );
};

export default ChatMessage;
