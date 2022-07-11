import * as React from 'react';
import styled from 'styled-components';

export interface ProgressProps {
    width: number;
}

const Container = styled.div`
    padding: 10px 20px;
    background-color: #333;
    width: 300px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProgressTrack = styled.div`
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: #f1f5f8;
    overflow: hidden;
`;

const ProgressSlide = styled.div`
    height: inherit;
    background-color: orangered;
    border-radius: inherit;
`;

export default function Progress({ width }: ProgressProps) {
    return (
        <Container>
            <ProgressTrack>
                <ProgressSlide style={{ width: `${width}%` }} />
            </ProgressTrack>
        </Container>
    );
}
