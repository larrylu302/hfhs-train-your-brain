import { Button, Grid } from '@mui/material';
import CurrentPage from '../constants/CurrentPage';

export default function MainMenu({ setCurrentPage }) {
  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' spacing='20'>
      <Grid item>
        <Button size='large' variant='contained' onClick={() => setCurrentPage(CurrentPage.Sequence)}>
          Words
        </Button>
      </Grid>
      <Grid item>
        <Button size='large' variant='contained' onClick={() => setCurrentPage(CurrentPage.Digits)}>
          Digits
        </Button>
      </Grid>
      <Grid item>
        <Button size='large' variant='contained' onClick={() => setCurrentPage(CurrentPage.DigitsReversed)}>
          Digits (Reversed)
        </Button>
      </Grid>
      <Grid item>
        <Button size='large' variant='contained' onClick={() => setCurrentPage(CurrentPage.Categorization)}>
          Verbal
        </Button>
      </Grid>
      <Grid item>
        <Button size='large' variant='contained' onClick={() => setCurrentPage(CurrentPage.Test)}>
          TEST
        </Button>
      </Grid>
    </Grid>
  );
}
