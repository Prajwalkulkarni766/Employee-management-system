import React, { useState, useEffect } from 'react';

const getHandRotation = (value, totalDivisions) => {
    // Calculate degrees per division
    const degreesPerDivision = 360 / totalDivisions;
    // Calculate rotation based on value
    return value * degreesPerDivision;
};

const AnalogClock = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        const updateClock = () => {
            const date = new Date();
            setSeconds(date.getSeconds());
            setMinutes(date.getMinutes());
            setHours(date.getHours());
        };

        updateClock();

        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId); // Cleanup function to stop interval on unmount
    }, []);

    const secondHandStyle = {
        position: 'absolute',
        height: '130px',
        width: '4px',
        bottom: '0',
        borderRadius: '25px',
        transformOrigin: 'bottom',
        backgroundColor: '#e74c3c',
        transform: `rotate(${getHandRotation(seconds, 60)}deg)`,
    };

    const minuteHandStyle = {
        position: 'absolute',
        height: '120px',
        width: '5px',
        bottom: '0',
        borderRadius: '25px',
        transformOrigin: 'bottom',
        backgroundColor: '#18191a',
        transform: `rotate(${getHandRotation(minutes, 60)}deg)`,
    };

    const hourHandStyle = {
        position: 'absolute',
        height: '100px',
        width: '8px',
        bottom: '0',
        borderRadius: '25px',
        transformOrigin: 'bottom',
        backgroundColor: '#18191a',
        transform: `rotate(${getHandRotation(hours % 12, 12)}deg)`,
    };

    return (
        <div className="container" style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f6f7fb' }}>
            <div className="clock" style={{ display: 'flex', height: '400px', width: '400px', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', background: '#fff', boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1), 0 25px 45px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
                    <label key={number} style={{ position: 'absolute', inset: '20px', textAlign: 'center', transform: `rotate(calc(var(--i) * (360deg / 12)))` }}>
                        <span style={{ display: 'inline- block', fontSize: '30px', fontWeight: '600', color: '#18191a', transform: `rotate(calc(var(--i) * (-360deg / 12)))` }}>{number}</span>
                    </label>
                ))}

<label key={number} style={{ position: 'absolute', inset: '20px', textAlign: 'center', transform: `rotate(calc(var(--i) * (360deg / 12)))` }}>
                        <span style={{ display: 'inline- block', fontSize: '30px', fontWeight: '600', color: '#18191a', transform: `rotate(calc(var(--i) * (-360deg / 12)))` }}>{number}</span>
                    </label>
                <div className="indicator" style={{ position: 'absolute', height: '10px', width: '10px', display: 'flex', justifyContent: 'center' }}>
                    <span className="hand hour" style={hourHandStyle}></span>
                    <span className="hand minute" style={minuteHandStyle}></span>
                    <span className="hand second" style={secondHandStyle}></span>
                </div>
            </div>
        </div>
    );
};

export default AnalogClock;
