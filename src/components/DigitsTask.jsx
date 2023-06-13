import { Button, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import TaskState from '../constants/TaskState';
import { DIGIT_DIRECTIONS } from '../constants/Directions';
import { DIGIT_SETTINGS_DEFAULT } from '../constants/settings';
import { useTts } from 'tts-react';
import { useEffect } from 'react';

function randomDigit() {
  return Math.floor(10 * Math.random());
}

function randomDigits(length) {
  return [...Array(length)].map((_, index) => randomDigit());
}

function NumbersInput({ correctLength, submit }) {
  const [input, setInput] = useState([]);

  function addDigit(digit) {
    if (input.length < correctLength) {
      setInput([...input, digit]);
    }
  }

  const buttons = [...Array(10)].map((_, index) => (
    <Button variant='contained' onClick={() => addDigit(index)} key={index}>
      {index}
    </Button>
  ));

  return (
    <Stack>
      <Typography> {input.join(' ')} </Typography>
      <Stack direction='row'>{buttons}</Stack>
      <Button disabled={input.length != correctLength} onClick={() => submit(input)}>
        Submit
      </Button>
    </Stack>
  );
}

const waitBeforeAudio = 1;
function Speak({ children, callback }) {
  const { state, play, ttsChildren } = useTts({
    children,
    rate: 0.75,
    markTextAsSpoken: true,
  });
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      play();
      setPlayed(true);
    }, waitBeforeAudio * 1000);
    return () => clearTimeout(timeoutId);
  }, [play]);

  useEffect(() => {
    if (!state.isPlaying && played) {
      callback();
    }
  }, [callback, played, state.isPlaying]);

  return (
    <>
      <div style={{ display: 'none' }}>{ttsChildren}</div>
    </>
  );
}

// playing -> waitAfter -> input -> playing/results

const waitAfterAudio = DIGIT_SETTINGS_DEFAULT.timeBeforeTest;
const startingDigits = DIGIT_SETTINGS_DEFAULT.startingDigits;
export function DigitsTask({ reversed }) {
  const [state, setState] = useState('playing');
  const [digits, setDigits] = useState(randomDigits(startingDigits));

  function addDigit() {
    setDigits([...digits, randomDigit()]);
  }

  function submitAnswer(answer) {
    if (
      (!reversed && answer.every((val, index) => val === digits[index])) ||
      (reversed && answer.every((val, index) => val === digits[digits.length - index - 1]))
    ) {
      addDigit();
      setState('playing');
    } else {
      setState('results');
    }
  }
  console.log(state);

  let content;
  switch (state) {
    case 'playing':
      content = <Speak callback={() => setState('waitAfter')}>{digits.join(', ')}</Speak>;
      break;
    case 'waitAfter':
      content = <></>;
      setTimeout(() => setState('input'), waitAfterAudio * 1000);
      break;
    case 'input':
      content = <NumbersInput correctLength={digits.length} submit={submitAnswer} />;
      break;
    case 'results':
      content = <Typography> Your score was {digits.length - startingDigits} </Typography>;
      break;
  }

  return content;
}

function DigitsDirections({ setTaskState }) {
  return (
    <Stack>
      <Typography>{DIGIT_DIRECTIONS}</Typography>
      <Button onClick={() => setTaskState(TaskState.Playing)}>OK</Button>
    </Stack>
  );
}

export default function DigitsTaskWithDirections() {
  const [taskState, setTaskState] = useState(TaskState.Directions);

  let content;

  switch (taskState) {
    case TaskState.Directions:
      content = <DigitsDirections setTaskState={setTaskState} />;
      break;
    case TaskState.Playing:
      content = <DigitsTask reversed={false} />;
      break;
    case TaskState.Settings:
      content = <></>;
  }

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' spacing='20'>
      {content}
    </Grid>
  );
}
