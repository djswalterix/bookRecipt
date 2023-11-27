const tokenMiddleware = (store) => (next) => (action) => {
  const tokenTimestamp = localStorage.getItem("tokenTimestamp");
  const currentTime = Date.now();

  // Verifica se sono passate più di un'ora
  if (currentTime - tokenTimestamp > 3600000) {
    // Token scaduto, puoi fare il logout o rinnovare il token
    store.dispatch(logout());
  } else {
    // Token ancora valido
    next(action);
  }
};
