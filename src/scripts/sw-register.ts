export function registerSW() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(reg => {
          console.log('SW registered', reg);

          // Cek update secara berkala setiap 60 detik
          setInterval(() => reg.update(), 60_000);

          reg.addEventListener('updatefound', () => {
            const newSW = reg.installing;
            if (!newSW) return;
            newSW.addEventListener('statechange', () => {
              if (newSW.state === 'activated') {
                window.location.reload();
              }
            });
          });
        })
        .catch(err => console.error('SW registration failed', err));
    });
  }
}
