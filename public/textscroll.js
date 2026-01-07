(() => {
    const init = () => {
        const headings = document.querySelectorAll('.tr__heading__animation');

        if (!headings.length) {
            console.log('[TextScroll] No .tr__heading__animation elements found');
            return;
        }

        console.log('[TextScroll] Found', headings.length, 'headings to animate');

        headings.forEach((heading) => {
            heading.classList.add('text-scroll-heading');
            // Add class to all nested elements (lines, wrappers, spans)
            const allNestedElements = heading.querySelectorAll('*');
            allNestedElements.forEach((el) => {
                el.classList.add('text-scroll-line');
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('text-scroll-visible');
                    } else {
                        entry.target.classList.remove('text-scroll-visible');
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        headings.forEach((heading) => {
            observer.observe(heading);
        });

        console.log('[TextScroll] Initialized with', headings.length, 'headings');
    };

    // Wait for DOM and then init
    if (document.readyState === 'complete') {
        setTimeout(init, 500); // Small delay to ensure everything is mounted
    } else if (document.readyState === 'interactive') {
        setTimeout(init, 500);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(init, 500);
        }, { once: true });
    }

    // Also try on window load
    window.addEventListener('load', () => {
        console.log('[TextScroll] Window loaded, re-checking...');
        setTimeout(init, 200);
    });
})();

