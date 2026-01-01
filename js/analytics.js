(function () {
  const buildPageMetadata = () => {
    const pagePath = window.location.pathname || 'unknown';
    return {
      event_category: 'engagement',
      event_label: pagePath,
      page_path: pagePath,
      page_location: window.location.href
    };
  };

  const sendAnalyticsEvent = (eventName, labelSuffix) => {
    if (typeof gtag !== 'function') {
      return;
    }

    const metadata = buildPageMetadata();
    const eventLabel = labelSuffix ? `${metadata.page_path}:${labelSuffix}` : metadata.event_label;

    gtag('event', eventName, {
      ...metadata,
      event_label: eventLabel
    });
  };

  const sendLoginClickEvent = () => {
    sendAnalyticsEvent('send_login_code_click');
  };

  const sendSubscribeClickEvent = (locationLabel) => {
    sendAnalyticsEvent('newsletter_subscribe_click', locationLabel);
  };

  const registerAnalyticsHandlers = () => {
    document.addEventListener('click', (event) => {
      const loginButton = event.target.closest('[data-analytics="send-login-code"]');
      if (loginButton) {
        sendLoginClickEvent();
      }

      const subscribeButton = event.target.closest('[data-analytics="subscribe"]');
      if (subscribeButton) {
        const locationLabel = subscribeButton.dataset.analyticsLocation || 'subscribe';
        sendSubscribeClickEvent(locationLabel);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerAnalyticsHandlers);
  } else {
    registerAnalyticsHandlers();
  }
})();
