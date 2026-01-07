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
    
    // Create animations for images with curved motion
    let animationCount = 0;
    
    workItems.forEach((item, index) => {
        const workImage = item.querySelector('.tr__work__image');
        
        if (!workImage) {
            console.log('[SCROLL] Item', index, 'missing image');
            return;
        }
        
        // Even items (0, 2, 4...) - image on RIGHT side: curve from right
        if (index % 2 === 0) {
            window.gsap.set(workImage, {
                x: 120,
                y: -30,
                opacity: 0,
                scale: 0.85,
                rotation: 15
            });
            
            window.gsap.to(workImage, {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: 'top 75%',
                    end: 'top 25%',
                    scrub: 1.5,
                    once: false
                }
            });
            animationCount++;
            console.log('[SCROLL] Item', index, '- image curve from right');
        }
        // Odd items (1, 3, 5...) - image on LEFT side: curve from left
        else {
            window.gsap.set(workImage, {
                x: -120,
                y: -30,
                opacity: 0,
                scale: 0.85,
                rotation: -15
            });
            
            window.gsap.to(workImage, {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: 'top 75%',
                    end: 'top 25%',
                    scrub: 1.5,
                    once: false
                }
            });
            animationCount++;
            console.log('[SCROLL] Item', index, '- image curve from left');
        }
    });

    // Refresh ScrollTrigger to register all animations
    if (window.gsap.plugins?.ScrollTrigger) {
        window.gsap.plugins.ScrollTrigger.refresh();
        console.log('[SCROLL] ✓ All curved image animations created:', animationCount, 'and ScrollTrigger refreshed');
    }
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

        window.gsap.set(block, {
            x: fromRight ? 120 : -120,
            y: 60,
            opacity: 0,
            scale: 0.92,
            rotation: fromRight ? 6 : -6
        });

        window.gsap.to(block, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1.1,
                once: false
            }
        });

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

// Dribbble posts (last 6 images) with side-based curved motion
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

        const moveRight = index % 2 === 1; // right column moves right on scroll, left column moves left
        const targetX = moveRight ? 320 : -320;
        const targetRot = moveRight ? 8 : -8;

        // Start centered/visible and push outward as you scroll (reverses previous in-to-center motion)
        window.gsap.fromTo(post,
            {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotation: 0
            },
            {
                x: targetX,
                y: -20,
                opacity: 1,
                scale: 0.96,
                rotation: targetRot,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: post,
                    start: 'top 85%',
                    end: 'top 35%',
                    scrub: 1.2,
                    once: false
                }
            }
        );

        dribbbleAnimationCount++;
        console.log('[SCROLL] Dribbble post', index, '- push toward', moveRight ? 'right' : 'left');
    });

    if (window.gsap.plugins?.ScrollTrigger) {
        window.gsap.plugins.ScrollTrigger.refresh();
        console.log('[SCROLL] ✓ Dribbble animations created:', dribbbleAnimationCount, 'and ScrollTrigger refreshed');
    }
}

// Initialize when document is ready and GSAP is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('[SCROLL] DOM ready, initializing animations');
    setTimeout(() => {
        initProjectScrollAnimations();
        initAchievementScrollAnimations();
        initDribbbleScrollAnimations();
        initMarqueeScrollAnimations();
    }, 100);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('[SCROLL] DOMContentLoaded fired, initializing animations');
        setTimeout(() => {
            initProjectScrollAnimations();
            initAchievementScrollAnimations();
            initDribbbleScrollAnimations();
            initMarqueeScrollAnimations();
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
        initProjectScrollAnimations();
        initAchievementScrollAnimations();
        initDribbbleScrollAnimations();
        initMarqueeScrollAnimations();
    }, 200);
});
