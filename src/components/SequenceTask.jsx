import { useContext } from 'react';
import { SequenceSettingsContext } from '../App';
import { Grid } from '@mui/material';

export default function SequenceTask() {
  const { sequenceSettings, setSequenceSettings } = useContext(SequenceSettingsContext);

  return <Grid container direction='column' justifyContent='center' alignItems='center' spacing='20'></Grid>;
}
