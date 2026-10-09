/* ============================================================
   UN THEORY — MOBILE SWIPE NAVIGATION FIX
   ============================================================ */
(function () {
    const pages = [
        "index.html",
        "un-theory-overview.html",
        "un-theory-comparison.html",
        "un-theory-faq.html",
        "unified-theory-of-everything.html",
        "un-theory-index.html"
    ];

    // Normalize current path (handles root `/`, empty string, or lowercase URLs)
    let pathName = window.location.pathname.split("/").pop().toLowerCase();
    if (!pathName || pathName === "") pathName = "index.html";

    const currentIndex = pages.indexOf(pathName);

    let startX = 0;
    let startY = 0;
    let multiTouch = false;
    let startedInProtectedArea = false;

    // Mobile-friendly swipe thresholds
    const minSwipeDistance = 50;  // Reduced from 100px for easier mobile swiping
    const maxVerticalDrift = 60;   // Allows slight vertical angle during natural thumb swipes

    function isProtectedElement(element) {
        return element.closest(
            ".table-container, select, input, button, textarea, .dropdown-box, .search-box, .main-nav"
        );
    }

    document.addEventListener("touchstart", function (e) {
        if (e.touches.length !== 1) {
            multiTouch = true;
            return;
        }
        multiTouch = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startedInProtectedArea = !!isProtectedElement(e.target);
    }, { passive: true });

    document.addEventListener("touchend", function (e) {
        if (multiTouch || startedInProtectedArea || currentIndex === -1) return;
        if (window.visualViewport && window.visualViewport.scale > 1.05) return;
        if (!e.changedTouches.length) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        // Ensure swipe meets horizontal distance without excessive vertical drift
        if (Math.abs(deltaX) < minSwipeDistance || Math.abs(deltaY) > maxVerticalDrift) return;

        if (deltaX < 0) {
            // Swipe Left -> Move Forward
            const nextPage = pages[currentIndex + 1];
            if (nextPage) window.location.href = nextPage;
        } else {
            // Swipe Right -> Move Backward
            const prevPage = pages[currentIndex - 1];
            if (prevPage) window.location.href = prevPage;
        }
    }, { passive: true });
})();
