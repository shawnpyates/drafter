import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  Container,
  ListItem,
  ListItemText,
  Title,
  UpdatingIndicator,
} from './styledComponents';

function DragAndDropTable({
  title,
  teams,
  onDragEnd,
  areTeamsUpdating,
}) {
  return (
    <div>
      <UpdatingIndicator isVisible={areTeamsUpdating}>Updating...</UpdatingIndicator>
      <Container shouldBlur={areTeamsUpdating}>
        <Title>Update Draft Selection Order: {title}</Title>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {teams.map((team, index) => (
                  <Draggable key={team.id} draggableId={team.uuid} index={index}>
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