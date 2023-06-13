import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, Toolbar, styled } from '@mui/material';
import CurrentPage from './constants/CurrentPage';
import { createContext, useState } from 'react';
import MainMenu from './components/MainMenu';
import CategorizationTask from './components/CategorizationTask';
import DigitsTask from './components/DigitsTask';
import DigitsReversedTask from './components/DigitsReversedTask';
import SequenceTask from './components/SequenceTask';
import {
  CATEGORIZATION_SETTINGS_DEFAULT,
  DIGIT_REVERSED_SETTINGS_DEFAULT,
  DIGIT_SETTINGS_DEFAULT,
  SEQUENCE_SETTINGS_DEFAULT,
} from './constants/settings';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronLeft } from '@mui/icons-material';
import WordGrid from './experiments/WordGrid';

const AnimatedAppBar = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 240px)`,
    marginLeft: `240px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {
  const [currentPage, setCurrentPage] = useState(CurrentPage.MainMenu);
  const [drawerOpen, setDrawerOpen] = useState(false);

  let page;
  switch (currentPage) {
    case CurrentPage.MainMenu:
      page = <MainMenu setCurrentPage={setCurrentPage} />;
      break;
    case CurrentPage.Categorization:
      page = <CategorizationTask />;
      break;
    case CurrentPage.Digits:
      page = <DigitsTask />;
      break;
    case CurrentPage.DigitsReversed:
      page = <DigitsReversedTask />;
      break;
    case CurrentPage.Sequence:
      page = <SequenceTask />;
      break;
    case CurrentPage.Test:
      // page = <WordGrid />;
      break;
  }

  return (
    <Box display='flex' width='100vw' height='100vh' maxWidth='100%'>
      <CssBaseline />
      <AnimatedAppBar position='fixed' open={drawerOpen}>
        <Toolbar>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            edge='start'
            size='large'
            sx={{ ...(drawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AnimatedAppBar>
      <Drawer
        open={drawerOpen}
        anchor='left'
        variant='persistent'
        sx={{
          'flexShrink': 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Button variant='contained' onClick={() => setCurrentPage(CurrentPage.MainMenu)} sx={{ mx: 2 }}>
          Main Menu
        </Button>
      </Drawer>
      {page}
    </Box>
  );
}

export const CategorizationSettingsContext = createContext(null);
export const DigitsReversedSettingsContext = createContext(null);
export const DigitsSettingsContext = createContext(null);
export const SequenceSettingsContext = createContext(null);

export default function WrappedApp() {
  const [categorizationSettings, setCategorizationSettings] = useState(CATEGORIZATION_SETTINGS_DEFAULT);
  const [digitsReversedSettings, setDigitsReversedSettings] = useState(DIGIT_REVERSED_SETTINGS_DEFAULT);
  const [digitsSettings, setDigitsSettings] = useState(DIGIT_SETTINGS_DEFAULT);
  const [sequenceSettings, setSequenceSettings] = useState(SEQUENCE_SETTINGS_DEFAULT);

  return (
    <CategorizationSettingsContext.Provider value={{ categorizationSettings, setCategorizationSettings }}>
      <DigitsReversedSettingsContext.Provider value={{ digitsReversedSettings, setDigitsReversedSettings }}>
        <DigitsSettingsContext.Provider value={{ digitsSettings, setDigitsSettings }}>
          <SequenceSettingsContext.Provider value={{ sequenceSettings, setSequenceSettings }}>
            <App />
          </SequenceSettingsContext.Provider>
        </DigitsSettingsContext.Provider>
      </DigitsReversedSettingsContext.Provider>
    </CategorizationSettingsContext.Provider>
  );
}
