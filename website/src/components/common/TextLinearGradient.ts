import styled from 'styled-components';

export interface TextLinearGradientProps {
    direction: string;
    colors: Array<{ pos: string; color: string }>;
}

export const TextLinearGradientient = styled.span<TextLinearGradientProps>`
    background: linear-gradient(
        ${({ direction }) => direction},
        ${({ colors }) => colors.map((c) => `${c.color} ${c.pos}`).join(', ')}
    );
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
`;
