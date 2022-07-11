import * as React from 'react';
import { TextLinearGradientient } from '../common/TextLinearGradient';

const colors = [
    { pos: '0%', color: '#0c7bb3' },
    { pos: '100%', color: '#f2bae8' },
];

export default function Description() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <span style={{ fontSize: '200px' }}>⚡</span>
            <TextLinearGradientient
                direction="to left"
                colors={colors}
                style={{ marginTop: '20px', fontSize: '25px' }}
            >
                React hook - Track file download progress
            </TextLinearGradientient>
        </div>
    );
}
