/* ============================================================
   UN THEORY
   UNIVERSAL PAGE SWIPE NAVIGATION
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

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const currentIndex = pages.indexOf(currentPage);

    let startX = 0;
    let startY = 0;
    let multiTouch = false;
    let startedInProtectedArea = false;

    const swipeThreshold = 100;

    function isProtectedElement(element) {

        return element.closest(
            ".table-container," +
            "select," +
            "input," +
            "button," +
            "textarea," +
            ".dropdown-box," +
            ".search-box," +
            ".main-nav"
        );
    }

    document.addEventListener(
        "touchstart",
        function (e) {

            if (e.touches.length !== 1) {
                multiTouch = true;
                return;
            }

            multiTouch = false;

            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;

            startedInProtectedArea =
                !!isProtectedElement(e.target);

        },
        { passive: true }
    );

    document.addEventListener(
        "touchend",
        function (e) {

            if (multiTouch) return;

            if (startedInProtectedArea) return;

            if (
                window.visualViewport &&
                window.visualViewport.scale > 1.05
            ) {
                return;
            }

            if (!e.changedTouches.length) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const deltaX = endX - startX;
            const deltaY = endY - startY;

            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                return;
            }

            if (Math.abs(deltaX) < swipeThreshold) {
                return;
            }

            if (deltaX < 0) {

                const nextPage =
                    pages[currentIndex + 1];

                if (nextPage) {
                    window.location.href = nextPage;
                }

            } else {

                const prevPage =
                    pages[currentIndex - 1];

                if (prevPage) {
                    window.location.href = prevPage;
                }
            }
        },
        { passive: true }
    );

})();
