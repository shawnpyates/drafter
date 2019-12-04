import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Button } from '../../components';

import {
  Container,
  ListItem,
  ListItemText,
  Subtitle,
  Title,
  UpdatingIndicator,
} from './styledComponents';

import { dragAndDropTable as dragAndDropTableTexts } from '../../texts.json';

const {
  goBackToDraft: GO_BACK_TO_DRAFT,
  updateSelectionOrder: UPDATE_SELECTION_ORDER,
  updating: UPDATING,
} = dragAndDropTableTexts;

function DragAndDropTable({
  title,
  teams,
  onDragEnd,
  areTeamsUpdating,
  redirectToDraftHandler,
}) {
  return (
    <div>
      <Button
        value={GO_BACK_TO_DRAFT}
        clickHandler={redirectToDraftHandler}
        shouldPositionCenter={false}
      />
      <UpdatingIndicator isVisible={areTeamsUpdating}>{UPDATING}.</UpdatingIndicator>
      <Container shouldBlur={areTeamsUpdating}>
        <Title>{title}</Title>
        <Subtitle>{UPDATE_SELECTION_ORDER}</Subtitle>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {teams.map((team, index) => (
                  <Draggable key={team.uuid} draggableId={team.uuid} index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItem>
                          <ListItemText>
                            {`${team.selectionorder}. ${team.name}`}
                          </ListItemText>
                        </ListItem>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>  
      </Container>
    </div>
  );
};

export default DragAndDropTable;