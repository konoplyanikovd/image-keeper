import { useEffect, useState } from 'react';
import { eventBus } from '../utils';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        eventBus.on("notification", ({body = '', type = 'success', title = null}) => {
            setNotifications([...notifications, {color: type === 'success' ? 'green': 'red', content: body, title }]);
            setTimeout(() => setNotifications(notifications.slice(1, notifications.length)), 7000);
        });
    }, []);

    return (notifications.length > 0) && (
        <div className='flex flex-col z-90 fixed right-0 justify-end items-center pb-12 bottom-0'>
            {notifications.map(({content, color, title}) => 
                <div 
                    className='
                        w-80 flex 
                        flex-col p-5 
                        rounded-10p 
                        border mb-3 
                        border-slate-100 
                        border-solid 
                        font-inter
                        text-base
                        leading-tight 
                        tracking-tighter
                        shadow-lg' 
                    key={Math.random()*1000}
                >
                    {title && (<div className={`color-${color}-a font-bold`}>{title}</div>)}
                    <div className='font-normal color-gray-900 mt-1'>{content}</div>
                </div>
            )}
        </div>
    )
};
export default Notification;
