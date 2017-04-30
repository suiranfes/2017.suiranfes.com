if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
    reg.update();
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
};
