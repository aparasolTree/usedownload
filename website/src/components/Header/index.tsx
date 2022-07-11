import * as React from 'react';
import styled from 'styled-components';
import { TextLinearGradientient, TextLinearGradientProps } from '../common/TextLinearGradient';

const Container = styled.div`
    height: 45px;
    background-color: #fff;
    border-bottom: 2px solid #eee;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

const DateTime = styled.div`
    background-color: #333;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
`;

const colors: TextLinearGradientProps['colors'] = [
    { pos: '0%', color: '#0093E9' },
    { pos: '100%', color: '#80D0C7' },
];

export default function Header() {
    const hour = new Date().getHours();
    const isDatetime = !!(hour > 6 && hour < 18);

    return (
        <Container>
            <TextLinearGradientient direction="160deg" colors={colors}>
                <span style={{ fontSize: '23px', fontWeight: 700 }}>useDownload</span>
            </TextLinearGradientient>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <a style={{ textDecoration: 'none' }} href="https://www.github.com/aparasolTree">
                    github
                </a>
                <DateTime>{isDatetime ? '☀' : '🌙'}</DateTime>
            </div>
        </Container>
    );
}
