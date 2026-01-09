// Project Section Scroll Animations - Images with Curved Motion
console.log('[SCROLL] Script loaded');

function initProjectScrollAnimations() {
    console.log('[SCROLL] initProjectScrollAnimations called');
    
    // Wait for GSAP to be available
    if (!window.gsap) {
        console.log('[SCROLL] GSAP not available yet, retrying in 200ms...');
        setTimeout(initProjectScrollAnimations, 200);
        return;
    }
    
    if (!window.gsap.plugins?.ScrollTrigger) {
        console.log('[SCROLL] ScrollTrigger not registered, registering now...');
        window.gsap.registerPlugin(window.gsap.plugins?.ScrollTrigger || ScrollTrigger);
    }

    // Get all work items
    const workItems = document.querySelectorAll('.tr__work');
    
    if (workItems.length === 0) {
        console.log('[SCROLL] No work items found, retrying in 300ms...');
        setTimeout(initProjectScrollAnimations, 300);
        return;
    }
    
    console.log('[SCROLL] ✓ GSAP available, ScrollTrigger loaded, found', workItems.length, 'work items');
    
    // Create animations matching internship section exactly
    let animationCount = 0;
    
    workItems.forEach((item, index) => {
        // Prevent duplicate timelines if this init runs multiple times
        if (item.dataset.animInit === '1') {
            return;
        }
        item.dataset.animInit = '1';
        
        const workImage = item.querySelector('.tr__work__image');
        
        if (!workImage) {
            console.log('[SCROLL] Item', index, 'missing image');
            return;
        }
        
        // Scroll-tied from→to animation (mirrors achievements/internship logic): outside → home, reverses on scroll up
        const fromRight = index % 2 === 1;
        window.gsap.fromTo(workImage,
            {
                x: fromRight ? 320 : -320,
                y: 120,
                opacity: 0,
                scale: 0.92,
                rotation: fromRight ? 12 : -12
            },
            {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotation: 0,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'top 25%',
                    scrub: 1.4,
                    once: false
                }
            }
        );
        animationCount++;
        console.log('[SCROLL] Item', index, '- curve from', fromRight ? 'right' : 'left');
    });

    // Refresh ScrollTrigger to register all animations
    if (window.gsap.plugins?.ScrollTrigger) {
        window.gsap.plugins.ScrollTrigger.refresh();
        console.log('[SCROLL] ✓ All project animations created:', animationCount, 'matching internship section, ScrollTrigger refreshed');
    }
}

// Header Text Scroll Animation - Slide from left/right with dark to light transition
function initHeaderScrollAnimations() {
    console.log('[SCROLL] initHeaderScrollAnimations called');

    if (!window.gsap) {
        console.log('[SCROLL] GSAP not available yet for header, retrying in 200ms...');
        setTimeout(initHeaderScrollAnimations, 200);
        return;
    }

    if (!window.gsap.plugins?.ScrollTrigger) {
        console.log('[SCROLL] ScrollTrigger not registered for header, registering now...');
        window.gsap.registerPlugin(window.gsap.plugins?.ScrollTrigger || ScrollTrigger);
    }

    const headerSection = document.querySelector('.tr__banner');
    const headerSpans = headerSection?.querySelectorAll('.tr__banner h1 span');

    if (!headerSpans || headerSpans.length === 0) {
        console.log('[SCROLL] Header spans not found, retrying in 300ms...');
        setTimeout(initHeaderScrollAnimations, 300);
        return;
    }

    console.log('[SCROLL] Found', headerSpans.length, 'header spans to animate');

    headerSpans.forEach((span, index) => {
        // Alternate direction: even from left, odd from right
        const fromLeft = index % 2 === 0;
        const startX = fromLeft ? -200 : 200;

        // Set initial state: off-screen and dark
        window.gsap.set(span, {
            x: startX,
            opacity: 0.3,
            color: '#444444'
        });

        // Create animation timeline
        window.gsap.to(span, {
            x: 0,
            opacity: 1,
            color: '#ffffff',
            ease: 'power2.out',
            scrollTrigger: {
                trigger: headerSection,
                start: 'top 70%',
                end: 'top 20%',
                scrub: 1,
                onEnter: () => console.log('[SCROLL] Header span', index, 'entering from', fromLeft ? 'left' : 'right'),
                onLeaveBack: () => console.log('[SCROLL] Header span', index, 'leaving back')
            }
        });
    });

    if (window.gsap.plugins?.ScrollTrigger) {
        window.gsap.plugins.ScrollTrigger.refresh();
    }

    console.log('[SCROLL] ✓ Header animations initialized');
}

// Achievement Stats Scroll Animations - Cards with Curved Motion
function initAchievementScrollAnimations() {
    console.log('[SCROLL] initAchievementScrollAnimations called');

    // Wait for GSAP to be available
    if (!window.gsap) {
        console.log('[SCROLL] GSAP not available yet for achievements, retrying in 200ms...');
        setTimeout(initAchievementScrollAnimations, 200);
        return;
    }

    if (!window.gsap.plugins?.ScrollTrigger) {
        console.log('[SCROLL] ScrollTrigger not registered for achievements, registering now...');
        window.gsap.registerPlugin(window.gsap.plugins?.ScrollTrigger || ScrollTrigger);
    }

    const achievementBlocks = document.querySelectorAll('.tr__home__achieved__block');

    if (achievementBlocks.length === 0) {
        console.log('[SCROLL] No achievement blocks found, retrying in 300ms...');
        setTimeout(initAchievementScrollAnimations, 300);
        return;
    }

    let achievementAnimationCount = 0;

    achievementBlocks.forEach((block, index) => {
        // Prevent duplicate timelines if this init runs multiple times
        if (block.dataset.animInit === '1') {
            return;
        }
        block.dataset.animInit = '1';

        const fromRight = index % 2 === 1;

        // Scroll-tied motion matching the gallery feel: far outside → home position, reverses on scroll up
        window.gsap.fromTo(block,
            {
                x: fromRight ? 320 : -320,
                y: 120,
                opacity: 0,
                scale: 0.92,
                rotation: fromRight ? 12 : -12
            },
            {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotation: 0,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: block,
                    start: 'top 85%',
                    end: 'top 25%',
                    scrub: 1.4,
                    once: false
                }
            }
        );

        achievementAnimationCount++;
        console.log('[SCROLL] Achievement block', index, '- curve from', fromRight ? 'right' : 'left');
    });

    if (window.gsap.plugins?.ScrollTrigger) {
        window.gsap.plugins.ScrollTrigger.refresh();
        console.log('[SCROLL] ✓ Achievement animations created:', achievementAnimationCount, 'and ScrollTrigger refreshed');
    }
}

// Marquee Text Scroll Animations - Continuous loop left/right and right/left
function initMarqueeScrollAnimations() {
    console.log('[SCROLL] initMarqueeScrollAnimations called');

    if (!window.gsap) {
        console.log('[SCROLL] GSAP not available yet for marquee, retrying in 200ms...');
        setTimeout(initMarqueeScrollAnimations, 200);
        return;
    }

    const marqueeRows = document.querySelectorAll('.tr__text__marquee__row');

    if (marqueeRows.length === 0) {
        console.log('[SCROLL] No marquee rows found, retrying in 300ms...');
        setTimeout(initMarqueeScrollAnimations, 300);
        return;
    }

    let marqueeAnimationCount = 0;

    marqueeRows.forEach((row, rowIndex) => {
        if (row.dataset.animInit === '1') {
            return;
        }
        row.dataset.animInit = '1';

        // First row moves right to left and back, second row moves left to right and back
        const moveLeft = rowIndex % 2 === 0;
        const distance = moveLeft ? -100 : 100;

        window.gsap.to(row, {
            x: distance,
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        marqueeAnimationCount++;
        console.log('[SCROLL] Marquee row', rowIndex, '- continuous loop', moveLeft ? 'right→left→right' : 'left→right→left');
    });

    console.log('[SCROLL] ✓ Marquee loop animations created:', marqueeAnimationCount);
}

// Gallery posts (6 images) - scroll-controlled slide to full left/right
function initDribbbleScrollAnimations() {
    console.log('[SCROLL] initDribbbleScrollAnimations called');

    if (!window.gsap) {
        console.log('[SCROLL] GSAP not available yet for dribbble, retrying in 200ms...');
        setTimeout(initDribbbleScrollAnimations, 200);
        return;
    }

    if (!window.gsap.plugins?.ScrollTrigger) {
        console.log('[SCROLL] ScrollTrigger not registered for dribbble, registering now...');
        window.gsap.registerPlugin(window.gsap.plugins?.ScrollTrigger || ScrollTrigger);
    }

    const dribbblePosts = document.querySelectorAll('.tr__home__dribbble__post');
    const dribbbleSection = document.querySelector('.tr__home__dribbble');

    if (dribbblePosts.length === 0) {
        console.log('[SCROLL] No dribbble posts found, retrying in 300ms...');
        setTimeout(initDribbbleScrollAnimations, 300);
        return;
    }

    let dribbbleAnimationCount = 0;

    dribbblePosts.forEach((post, index) => {
        if (post.dataset.animInit === '1') {
            return;
        }
        post.dataset.animInit = '1';

        // Alternate direction: left column slides full left, right column slides full right
        const slideRight = index % 2 === 1;
        const fullDistance = slideRight ? 300 : -300;
        const rotation = slideRight ? 20 : -20;

        // Set initial state at center
        window.gsap.set(post, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1
        });

        // Scroll-controlled animation: slides to full distance on scroll down, returns on scroll up
        window.gsap.to(post, {
            x: fullDistance,
            y: -60,
            rotation: rotation,
            scale: 0.95,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: dribbbleSection || post,
                start: 'top 70%',
                end: 'bottom 20%',
                scrub: 2,
                once: false
            }
        });

        dribbbleAnimationCount++;
        console.log('[SCROLL] Gallery post', index, '- scroll-controlled slide to full', slideRight ? 'right' : 'left');
    });

    if (window.gsap.plugins?.ScrollTrigger) {
        window.gsap.plugins.ScrollTrigger.refresh();
        console.log('[SCROLL] ✓ Gallery animations created:', dribbbleAnimationCount, 'and ScrollTrigger refreshed');
    }
}

// Initialize when document is ready and GSAP is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('[SCROLL] DOM ready, initializing animations');
    setTimeout(() => {
        initHeaderScrollAnimations();
        initProjectScrollAnimations();
        initAchievementScrollAnimations();
        initDribbbleScrollAnimations();
        initMarqueeScrollAnimations();
        initVideoScrollAnimation();
    }, 100);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('[SCROLL] DOMContentLoaded fired, initializing animations');
        setTimeout(() => {
            initHeaderScrollAnimations();
            initProjectScrollAnimations();
            initAchievementScrollAnimations();
            initDribbbleScrollAnimations();
            initMarqueeScrollAnimations();
            initVideoScrollAnimation();
        }, 100);
    });
}

// Also try initializing on window load
window.addEventListener('load', () => {
    console.log('[SCROLL] Window loaded, refreshing animations');
    setTimeout(() => {
        if (window.gsap?.plugins?.ScrollTrigger) {
            window.gsap.plugins.ScrollTrigger.refresh();
        }
        initHeaderScrollAnimations();
        initProjectScrollAnimations();
        initAchievementScrollAnimations();
        initDribbbleScrollAnimations();
        initMarqueeScrollAnimations();
        initVideoScrollAnimation();
    }, 200);
});

// Video Scroll Animation - Expand video as user scrolls
function initVideoScrollAnimation() {
    console.log('[SCROLL] initVideoScrollAnimation called');
    
    if (!window.gsap) {
        console.log('[SCROLL] GSAP not available yet for video, retrying in 200ms...');
        setTimeout(initVideoScrollAnimation, 200);
        return;
    }
    
    if (!window.gsap.plugins?.ScrollTrigger) {
        console.log('[SCROLL] ScrollTrigger not registered for video, registering now...');
        window.gsap.registerPlugin(window.gsap.plugins?.ScrollTrigger || ScrollTrigger);
    }
    
    const videoWrapper = document.querySelector('#video');
    const video = videoWrapper?.querySelector('video');
    
    if (!video) {
        console.log('[SCROLL] Video element not found, retrying in 300ms...');
        setTimeout(initVideoScrollAnimation, 300);
        return;
    }
    
    console.log('[SCROLL] ✓ Video element found, creating scroll animation');
    
    // Initial state: small video with rounded corners
    window.gsap.set(video, {
        width: '60%',
        maxWidth: '500px',
        borderRadius: '1.5rem'
    });
    
    // Animate to large size on scroll down
    window.gsap.to(video, {
        width: '100%',
        maxWidth: '100%',
        borderRadius: '1.5rem',
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: videoWrapper,
            start: 'top 100%',
            end: 'center 50%',
            scrub: 2,
            once: false
        }
    });
    
    if (window.gsap.plugins?.ScrollTrigger) {
        window.gsap.plugins.ScrollTrigger.refresh();
        console.log('[SCROLL] ✓ Video scroll animation created and ScrollTrigger refreshed');
    }
}

// Initialize video animation
initVideoScrollAnimation();

