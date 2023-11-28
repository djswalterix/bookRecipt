const tokenMiddleware = (store) => (next) => (action) => {
  // Retrieve token timestamp from local storage
  const tokenTimestamp = localStorage.getItem("tokenTimestamp");
  const currentTime = Date.now();

  // Check if the token timestamp is available and if more than an hour has passed
  if (tokenTimestamp && currentTime - tokenTimestamp > 3600000) {
    // Token expired, dispatch a logout action or renew the token
    store.dispatch(logout());
  } else {
    // Token still valid, proceed with the action
    next(action);
  }
};
