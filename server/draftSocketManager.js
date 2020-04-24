module.exports = (io) => {
  const draftSocketManager = io.of('/drafts').on('connection', (socket) => {
    socket.on('joinDraft', (draftId) => {
      socket.join(draftId);
    });
    socket.on('draftSelection', ({
      draftId,
      teamName,
      playerName,
      isRandomAssignment,
    }) => {
      draftSocketManager.to(draftId).emit(
        'broadcastDraftSelection',
        {
          draftId,
          teamName,
          playerName,
          isRandomAssignment,
        },
      );
    });
    socket.on('draftStarted', ({ draftId, draftName }) => {
      draftSocketManager.to(draftId).emit('broadcastDraftStart', { draftId, draftName });
    });
  });
};
