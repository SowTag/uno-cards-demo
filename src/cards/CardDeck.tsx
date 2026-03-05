import { useState } from 'react';
import styles from './CardDeck.module.css';
import { Card, getCardDisplayValue } from './Card';
import type { CardType, ColoredCard } from './Card';

export interface CardDeckProps {
    cards: CardType[];
    translationX?: number;
    translationHoverY?: number;
    translationSelectedY?: number;
    overlapMargin?: number;
    transitionTime?: number;
}

export function CardDeck({
    cards,
    translationX = 40,
    translationHoverY = -20,
    translationSelectedY = -40,
    overlapMargin = -90,
    transitionTime = 0.3
}: CardDeckProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className={styles.gameContainer} style={{ '--transition-time': `${transitionTime}s` } as React.CSSProperties}>
            <div className={styles.selectedDisplay}>
                <div className={styles.selectedTitle}>Currently selected</div>
                {selectedIndex !== null ? (
                    <div style={{ fontSize: '1rem' }}>
                        {typeof cards[selectedIndex] === 'string'
                            ? cards[selectedIndex]
                            : `${(cards[selectedIndex] as ColoredCard).color} ${getCardDisplayValue(cards[selectedIndex])}`}
                    </div>
                ) : (
                    <div style={{ color: '#555', fontSize: '1rem' }}>None</div>
                )}
            </div>

            <div className={styles.cardStack} onMouseLeave={() => setHoveredIndex(null)}>
                {cards.map((card, index) => {
                    const isSelected = selectedIndex === index;
                    const isHovered = hoveredIndex === index;

                    let translateX = 0;
                    let translateY = 0;

                    if (isSelected) {
                        translateY = translationSelectedY;
                    } else if (isHovered) {
                        translateY = translationHoverY;
                    }

                    if (hoveredIndex !== null && !isSelected) {
                        if (index < hoveredIndex) translateX = -translationX;
                        if (index > hoveredIndex) translateX = translationX;
                    }

                    let zIndex = index;
                    if (isHovered) zIndex = 50;
                    if (isSelected) zIndex = 100;

                    return (
                        <Card
                            key={index}
                            card={card}
                            isSelected={isSelected}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onClick={() => setSelectedIndex(isSelected ? null : index)}
                            style={{
                                marginLeft: index === 0 ? '0' : `${overlapMargin}px`,
                                zIndex: zIndex
                            }}
                            visualStyle={{
                                transform: `translate(${translateX}px, ${translateY}px)`
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
