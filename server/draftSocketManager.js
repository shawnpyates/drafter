module.exports = (io) => {
  const draftSocketManager = io.of('/drafts').on('connection', (socket) => {
    socket.on('joinDraft', (draftId) => {
      socket.join(draftId);
    });
    socket.on('draftSelection', (draftId) => {
      draftSocketManager.to(draftId).emit('broadcastDraftSelection', draftId);
    });
    socket.on('draftStarted', (draftId) => {
      draftSocketManager.to(draftId).emit('broadcastDraftStart', draftId);
    });
  });
};