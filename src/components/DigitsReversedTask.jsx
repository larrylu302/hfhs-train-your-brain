import { Button, Grid, Stack, Typography } from '@mui/material';
import { DIGIT_REVERSED_DIRECTIONS } from '../constants/Directions';
import TaskState from '../constants/TaskState';
import { useState } from 'react';
import { DigitsTask } from './DigitsTask';

function DigitsReversedDirections({ setTaskState }) {
  return (
    <Stack>
      <Typography>{DIGIT_REVERSED_DIRECTIONS}</Typography>
      <Button onClick={() => setTaskState(TaskState.Playing)}>OK</Button>
    </Stack>
  );
}

export default function DigitsReversedTaskWithDirections() {
  const [taskState, setTaskState] = useState(TaskState.Directions);

  let content;

  switch (taskState) {
    case TaskState.Directions:
      content = <DigitsReversedDirections setTaskState={setTaskState} />;
      break;
    case TaskState.Playing:
      content = <DigitsTask reversed={true} />;
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
