(function () {
    let burger;
    let navbar;
    let navbarContainer;
    let windowH;

    let navbarOpen = false;
    let isAnimating = false;

    let burgerSvgLine1;
    let burgerSvgLine2;
    let burgerSvgLine3;

    let cardMasks;

    function init() {
        navbar = document.querySelector('.navbar');
        navbarContainer = document.querySelector('.navbar--container');
        burger = document.querySelector('.header--button');
        burgerSvgLine1 = document.querySelector('.burger-line-1');
        burgerSvgLine2 = document.querySelector('.burger-line-2');
        burgerSvgLine3 = document.querySelector('.burger-line-3');
        
        cardMasks = document.querySelectorAll('.card__mask');
        window.addEventListener('resize', onResize);
        cardMasks.forEach((mask) => {
        gsap.set(mask, { opacity: 0 });
            mask.addEventListener('mouseenter',  onMaskHoverIn);
            mask.addEventListener('mouseleave',  onMaskHoverOut);
        });
        onResize();
    
    }
    function onMaskHoverIn() {
        gsap.to(this, { opacity: 1, duration: 0.2 });
    }

    function onMaskHoverOut() {
        gsap.to(this, { opacity: 0, duration: 0.2 });
    }

    function onResize() {
        windowH = window.innerHeight;
        if (window.innerWidth > 1024) {
            resetMobile();
            return;
        }
        setMobile();

    }

    function setMobile(){
        burger.addEventListener('click', onBurgerClick);
        console.log(burger);
        setupTweens();
    }
    function resetMobile(){
        burger.removeEventListener('click', onBurgerClick);
        gsap.set(navbarContainer, { clearProps: 'all' });
        gsap.set(navbar, { clearProps: 'all' });
        gsap.set(burgerSvgLine2, { clearProps: 'all' });
        gsap.set(burgerSvgLine1, { clearProps: 'all' });
        gsap.set(burgerSvgLine3, { clearProps: 'all' });
        navbarOpen = false;
        isAnimating = false;
    }

    function setupTweens() {
        gsap.set(navbarContainer, { height: 0, display: 'none' });
        gsap.set(navbar, { opacity: 0 });
    }

    function onBurgerClick() {
        if (!isAnimating) {
            if (!navbarOpen) {
                openMenu();
                return;
            }
            closeMenu();
        }
    }

    function openBurger() {
        gsap.to(burgerSvgLine2, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                gsap.to(burgerSvgLine1, { duration: 0.2, y: 10, transformOrigin: 'center center', rotate: 15 });
                gsap.to(burgerSvgLine3, { duration: 0.2, y: -10, transformOrigin: 'center center', rotate: -15 });
            },
        });
    }

    function closeBurger() {
        gsap.to(burgerSvgLine1, {
            duration: 0.2,
            y: 0,
            transformOrigin: 'center center',
            rotate: 0,
            onComplete: () => {
                gsap.to(burgerSvgLine2, { opacity: 1, duration: 0.2 });
            },
        });
        gsap.to(burgerSvgLine3, { duration: 0.2, y: 0, transformOrigin: 'center center', rotate: 0 });
    }

    function openMenu() {
        openBurger();
        isAnimating = true;
        gsap.set(navbarContainer, { display: 'flex' });
        gsap.to(navbarContainer, {
            height: windowH,
            duration: 0.3,
            onComplete: () => {
                gsap.to(navbar, {
                    opacity: 1,
                    duration: 0.2,
                    onComplete: () => {
                        navbarOpen = true;
                        isAnimating = false;
                    },
                });
            },
        });
    }

    function closeMenu() {
        closeBurger();
        isAnimating = true;
        gsap.to(navbar, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                gsap.to(navbarContainer, {
                    height: 0,
                    duration: 0.3,
                    onComplete: () => {
                        gsap.set(navbarContainer, { display: 'none' });
                        navbarOpen = false;
                        isAnimating = false;
                    },
                });
            },
        });
    }

    init();
})();
