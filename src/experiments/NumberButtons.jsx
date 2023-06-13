import { Button } from '@mui/material';
import { useTts } from 'tts-react';

function PausePlayButton({ children }) {
  const { state, play, pause } = useTts({ children });

  return <Button onClick={state.isPlaying ? pause : play}>{children}</Button>;
}

export default function NumberButtons() {
  const buttons = [...Array(10)].map((_, index) => (
    <PausePlayButton key={index.toString()}>{index.toString().repeat(20)}</PausePlayButton>
  ));

  return <div>{buttons}</div>;
}
