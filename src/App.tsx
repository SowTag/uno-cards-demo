import { useState } from 'react';
import { CardDeck } from './cards/CardDeck';
import type { CardType } from './cards/Card';

function App() {
  const [translationX, setTranslationX] = useState(40);
  const [translationHoverY, setTranslationHoverY] = useState(-20);
  const [translationSelectedY, setTranslationSelectedY] = useState(-40);
  const [overlapMargin, setOverlapMargin] = useState(-90);
  const [transitionTime, setTransitionTime] = useState(0.3);

  const cards: CardType[] = [
    { color: 'red', number: 3 },
    { color: 'red', number: 7 },
    { color: 'red', number: 'Skip' },
    { color: 'yellow', number: 'Skip' },
    { color: 'yellow', number: 5 },
    { color: 'yellow', number: 'Reverse' },
    { color: 'green', number: 'Reverse' },
    { color: 'green', number: 2 },
    { color: 'green', number: 8 },
    'Wild',
    { color: 'cyan', number: 8 },
    { color: 'cyan', number: 4 },
    { color: 'cyan', number: 'DrawTwo' },
    { color: 'red', number: 'DrawTwo' },
    { color: 'red', number: 9 },
    'WildDrawFour',
    { color: 'yellow', number: 9 },
    { color: 'yellow', number: 1 },
    { color: 'yellow', number: 6 },
    { color: 'green', number: 6 },
    { color: 'green', number: 'Skip' },
    { color: 'cyan', number: 'Skip' },
    { color: 'cyan', number: 0 },
    { color: 'cyan', number: 5 },
    { color: 'red', number: 5 }
  ];

  return (
    <main>
      <div style={{ position: 'fixed', top: 20, left: 20, background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          translation X: {translationX}
          <input type="range" min="0" max="100" value={translationX} onChange={e => setTranslationX(Number(e.target.value))} style={{ display: 'block' }} />
        </label>
        <label>
          hover Y: {translationHoverY}
          <input type="range" min="-100" max="0" value={translationHoverY} onChange={e => setTranslationHoverY(Number(e.target.value))} style={{ display: 'block' }} />
        </label>
        <label>
          selected Y: {translationSelectedY}
          <input type="range" min="-100" max="0" value={translationSelectedY} onChange={e => setTranslationSelectedY(Number(e.target.value))} style={{ display: 'block' }} />
        </label>
        <label>
          overlap margin: {overlapMargin}
          <input type="range" min="-150" max="0" value={overlapMargin} onChange={e => setOverlapMargin(Number(e.target.value))} style={{ display: 'block' }} />
        </label>
        <label>
          transition time: {transitionTime}s
          <input type="range" min="0" max="2" step="0.1" value={transitionTime} onChange={e => setTransitionTime(Number(e.target.value))} style={{ display: 'block' }} />
        </label>
      </div>

      <CardDeck
        cards={cards}
        translationX={translationX}
        translationHoverY={translationHoverY}
        translationSelectedY={translationSelectedY}
        overlapMargin={overlapMargin}
        transitionTime={transitionTime}
      />
    </main>
  );
}

export default App;
