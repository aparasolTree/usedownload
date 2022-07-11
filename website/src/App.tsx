import React from 'react';
import styled from 'styled-components';
import Download from './components/Download';
import Header from './components/Header';
import Description from './components/Description';

import { Center } from './components/common/Center';

const Application = styled.div`
    display: flex;
    flex-direction: column;
    background: radial-gradient(closest-side, rgba(0, 0, 0, 0.1) 50%, transparent 50%);
    background-size: 20px 20px;
    background-position: center;
`;

function App() {
    return (
        <Application style={{ height: '100vh' }}>
            <Header />
            <Center style={{ flexDirection: 'column', flex: 1 }}>
                <Description />
                <Download url="./video/3197123327.mp4" />
            </Center>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: '#aaa',
                    marginBottom: '10px',
                }}
            >
                <p>
                    Video from
                    {' '}
                    <a href="https://www.pexels.com/">https://www.pexels.com/</a>
                </p>
                <p>
                    author:
                    {' '}
                    <a href="https://www.pexels.com/zh-cn/@matthiasgroeneveld/">
                        Matthias Groeneveld
                    </a>
                </p>
            </div>
        </Application>
    );
}

export default App;
