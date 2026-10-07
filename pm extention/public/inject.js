(function () {
    const notify = () => window.dispatchEvent(new Event("pmext:route-change"));

    const originalPushState = history.pushState;
    history.pushState = function (...args) {
        originalPushState.apply(this, args);
        notify();
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
        originalReplaceState.apply(this, args);
        notify();
    };

    window.addEventListener("popstate", notify);
})();