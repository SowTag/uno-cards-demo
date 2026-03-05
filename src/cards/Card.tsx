import React from 'react';
import styles from './Card.module.css';

export type CardColor = 'red' | 'yellow' | 'green' | 'cyan';
export type CardAction = 'Skip' | 'Reverse' | 'DrawTwo';
export type CardNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type ColoredCard = {
    color: CardColor;
    number: CardNumber | CardAction;
};
export type WildCard = 'Wild' | 'WildDrawFour';
export type CardType = ColoredCard | WildCard;

const colorMap: Record<CardColor, string> = {
    red: '#ef4444',
    yellow: '#eab308',
    green: '#22c55e',
    cyan: '#06b6d4'
};

export const getCardDisplayValue = (card: CardType): string | number => {
    if (typeof card === 'string') return card === 'WildDrawFour' ? '+4' : 'Wild';
    switch (card.number) {
        case 'DrawTwo': return '+2';
        case 'Skip': return '⊘';
        case 'Reverse': return '⇄';
        default: return card.number;
    }
};

export interface CardProps {
    card: CardType;
    isSelected?: boolean;
    style?: React.CSSProperties;
    visualStyle?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export function Card({ card, isSelected, style, visualStyle, className = '', onClick, onMouseEnter, onMouseLeave }: CardProps) {
    const isWild = typeof card === 'string';
    const displayValue = getCardDisplayValue(card);
    const cardColor = isWild ? '#171717' : colorMap[(card as ColoredCard).color];
    const isSymbol = !isWild && ((card as ColoredCard).number === 'Skip' || (card as ColoredCard).number === 'Reverse');

    return (
        <div
            className={`${styles.cardWrapper} ${className}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={style}
        >
            <div
                className={`${styles.cardVisual} ${isSelected ? styles.cardSelected : ''}`}
                style={{ backgroundColor: cardColor, ...visualStyle }}
            >
                <div
                    className={styles.ellipse}
                    style={{ backgroundColor: isWild ? '#333' : 'white' }}
                />
                <div className={`${styles.cornerValue} ${styles.cornerTopLeft}`} style={{ WebkitTextStroke: isSymbol ? '0.5px black' : '1px black' }}>
                    {displayValue}
                </div>

                <div className={styles.centerValue} style={{
                    fontSize: isWild ? '36px' : (isSymbol ? '56px' : '72px'),
                    color: isWild ? 'white' : cardColor,
                    WebkitTextStroke: isWild ? 'none' : (isSymbol ? '0.5px black' : '2px black'),
                    textShadow: isWild ? 'none' : '3px 3px 0px black'
                }}>
                    {displayValue}
                </div>

                <div className={`${styles.cornerValue} ${styles.cornerBottomRight}`} style={{ WebkitTextStroke: isSymbol ? '0.5px black' : '1px black' }}>
                    {displayValue}
                </div>
            </div>
        </div>
    );
}
