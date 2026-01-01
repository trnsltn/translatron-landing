(function () {
  const eventName = 'send_login_code_click';

  const sendLoginClickEvent = () => {
    if (typeof gtag !== 'function') {
      return;
    }

    const pagePath = window.location.pathname || 'unknown';

    gtag('event', eventName, {
      event_category: 'engagement',
      event_label: pagePath,
      page_path: pagePath,
      page_location: window.location.href
    });
  };

  const registerAnalyticsHandlers = () => {
    document.addEventListener('click', (event) => {
      const targetButton = event.target.closest('[data-analytics="send-login-code"]');
      if (targetButton) {
        sendLoginClickEvent();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerAnalyticsHandlers);
  } else {
    registerAnalyticsHandlers();
  }
})();
