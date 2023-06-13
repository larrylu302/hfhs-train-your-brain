import { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { Paper, Grid, styled } from '@mui/material';
import { StrictModeDroppable as Droppable } from '../util/StrictModeDroppable';

const StyledGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  userSelect: 'none',
  cursor: 'grab',
}));

const words = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];

export default function WordGrid() {
  const [gridWords, setGridWords] = useState(words);

  console.log(gridWords);

  const handleDragEnd = result => {
    if (!result.destination) return;

    const newWords = [...gridWords];
    const [removedWord] = newWords.splice(result.source.index, 1);
    newWords.splice(result.destination.index, 0, removedWord);

    setGridWords(newWords);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='wordGrid'>
        {provided => (
          <StyledGrid
            container
            spacing={2}
            {...provided.droppableProps}
            ref={provided.innerRef}
            direction='column'
            justifyContent='center'
            alignItems='center'
          >
            {gridWords.map((word, index) => (
              <Draggable key={word} draggableId={word} index={index}>
                {provided => (
                  <Grid item>
                    <StyledPaper {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      {word}
                    </StyledPaper>
                  </Grid>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </StyledGrid>
        )}
      </Droppable>
    </DragDropContext>
  );
}
