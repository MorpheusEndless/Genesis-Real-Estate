// GSAP & ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);

// Hamburger menu toggle
const hamMenu = document.querySelector('.ham-menu');
const navLinks = document.querySelector('.nav-links');
hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Image slider functionality
const imageInfo = [
  { left: "", right: "" },
  { left: "Left Info 2", right: "Right Info 2" },
  { left: "Left Info 3", right: "Right Info 3" },
  { left: "Left Info 4", right: "Right Info 4" },
  { left: "Left Info 5", right: "Right Info 5" },
  { left: "Left Info 6", right: "Right Info 6" },
  { left: "Left Info 7", right: "Right Info 7" },
  { left: "Left Info 8", right: "Right Info 8" },
  { left: "Left Info 9", right: "Right Info 9" },
  { left: "Left Info 10", right: "Right Info 10" }
];

function showImage(index) {
  const images = document.querySelectorAll('.slider img');
  const buttons = document.querySelectorAll('.buttons button');
  const buttonsInner = document.querySelector('.buttons-inner');
  const leftInfo = document.getElementById('left-info');
  const rightInfo = document.getElementById('right-info');
  const info = document.querySelector('.info');
  const captions = document.querySelectorAll('.caption');

  images.forEach((img, i) => img.classList.toggle('active', i === index));
  buttons.forEach((btn, i) => {
    btn.classList.remove('active', 'adjacent');
    if (i === index) btn.classList.add('active');
    else if (i === index - 1 || i === index + 1) btn.classList.add('adjacent');
  });

  const buttonHeight = buttons[0].offsetHeight + 10;
  buttonsInner.style.transform = `translateY(-${(index - 1) * buttonHeight}px`;
  
  leftInfo.textContent = imageInfo[index].left;
  rightInfo.textContent = imageInfo[index].right;
  info.classList.remove('active');
  setTimeout(() => info.classList.add('active'), 10);
  captions.forEach((caption, i) => caption.classList.toggle('hidden', i !== index));
}

// Scroll behavior with GSAP
let lastScroll = 0;
const scrollElements = {
  nav: document.querySelector('nav'),
  caption: document.querySelector('.caption'),
  buttons: document.querySelector('.buttons')
};

gsap.set(scrollElements.nav, { y: 0 });
gsap.set(scrollElements.caption, { y: '-50%', x: '-50%' });
gsap.set(scrollElements.buttons, { y: '-50%' });

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  const scrollDown = currentScroll > lastScroll && currentScroll > 100;
  const scrollUp = currentScroll < lastScroll;
  const atTop = currentScroll < 50;

  if (atTop) {
    gsap.to([scrollElements.caption, scrollElements.buttons], {
      duration: 0.3,
      y: '-50%',
      opacity: 1,
      ease: "power2.out",
      overwrite: true
    });
    return;
  }

  if (Math.abs(currentScroll - lastScroll) > 5) {
    gsap.to(scrollElements.nav, {
      duration: 0.3,
      y: scrollDown ? -100 : 0,
      opacity: scrollDown ? 0 : 1,
      ease: "power2.out",
      overwrite: true
    });

    gsap.to(scrollElements.buttons, {
      duration: 0.3,
      y: scrollDown ? '-100%' : '-50%',
      opacity: scrollDown ? 0 : 1,
      ease: "power2.out",
      overwrite: true
    });

    gsap.to(scrollElements.caption, {
      duration: 0.3,
      y: scrollDown ? '-60%' : '-50%',
      opacity: scrollDown ? 0 : 1,
      ease: "power2.out",
      overwrite: true
    });
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});

// Loading animation
document.addEventListener("DOMContentLoaded", function () {
  gsap.fromTo("#loading .loading-text span", 
    { y: "100%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      repeat: 1,
      onComplete: function () {
        gsap.to("#loading", {
          opacity: 0,
          duration: 1,
          onComplete: function () {
            document.getElementById("loading").style.display = "none";
            document.getElementById("home-content").classList.remove("hidden");
            
            gsap.from(".slider img.active", { 
              duration: 2, 
              y: "200%", 
              ease: "power1.out" 
            });

            gsap.from(".slider .overlay", { 
              duration: 2, 
              opacity: 0, 
              ease: "power1.out" 
            });

            gsap.from("nav", { 
              duration: 1, 
              y: "-100%", 
              ease: "power2.out", 
              delay: 2 
            });

            gsap.from(".info div", { 
              duration: 1, 
              y: "100%", 
              opacity: 0, 
              ease: "power2.out", 
              stagger: 0.5, 
              delay: 2 
            });

            gsap.from(".buttons-inner", {
              duration: 1,
              x: '100%',
              opacity: 0,
              ease: "power1.out",
              delay: 2
            });

            gsap.fromTo(".caption-logo, .caption h5, .caption h1, .caption h4", {
              opacity: 0,
              y: 50
            }, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power1.out",
              stagger: 0.3,
              delay: 3
            });
          }
        });
      }
    }
  );
});

// Number animations
const animateNumber = (element, finalValue) => {
  gsap.to(element, {
    textContent: finalValue,
    duration: 2,
    ease: "power1.out",
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      once: true
    },
    onUpdate: function() {
      const current = Math.ceil(this.targets()[0].textContent);
      if (element.classList.contains('big-number')) {
        element.textContent = Math.floor(current / 1000) + 'k';
      } else {
        element.textContent = current + '+';
      }
    },
    onStart: function() {
      gsap.set(element, { opacity: 1 });
    }
  });
};

// Core animations
function initAnimations() {
  gsap.utils.toArray(['.section-title', '.main-stat h2', '.stat-item', '.description', '.cta-text']).forEach(el => {
    gsap.from(el, {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true
      }
    });
  });

  animateNumber(document.querySelector('.big-number'), 17000);
  document.querySelectorAll('.stat-number').forEach((num, index) => {
    animateNumber(num, [150, 25, 25][index]);
  });

  ScrollTrigger.create({
    trigger: "#home-one",
    start: "top top",
    end: "+=100%",
    pin: true,
    pinSpacing: false
  });
}

// Tour animations
function initTakeTourAnimations() {
  gsap.set(".logo-page-1", { y: -100, autoAlpha: 0 });
  gsap.set(".tour-carousel-container", { x: 100, autoAlpha: 0 });

  const takeTourTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#take-tour",
      start: "top center",
      end: "+=40%",
      toggleActions: "play none none none"
    }
  });

  takeTourTL.to(".logo-page-1", {
    y: 0,
    autoAlpha: 1,
    duration: 1.2,
    ease: "power3.out"
  })
  .to(".tour-carousel-container", {
    x: 0,
    autoAlpha: 1,
    duration: 1.5,
    ease: "power3.out",
    stagger: 0.2
  }, "-=0.5");

  gsap.utils.toArray(".property-card").forEach((card, i) => {
    gsap.from(card, {
      x: 100,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      delay: i * 0.1
    });
  });
}

// Pages animations
gsap.set(".logo-page", { y: -100, autoAlpha: 0 });
gsap.set(".carousel-container", { xPercent: -100, autoAlpha: 0 });
gsap.set(".carousel-slide .image-container img", { scale: 1.2, autoAlpha: 0 });

const pagesTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#pages",
    start: "top bottom",
    end: "top 30%", // Changed end position
    toggleActions: "play none none none"
  }
});

pagesTL.to(".logo-page", {
  y: 0,
  autoAlpha: 1,
  duration: 1.2,
  ease: "power4.out"
})
.to(".carousel-container", {
  xPercent: 0,
  autoAlpha: 1,
  duration: 2.4, // Adjusted duration
  ease: "power4.out", // Changed easing
  onUpdate: function() {
    // Force final position when near completion
    if(this.progress() > 0.95) {
      gsap.set(".carousel-container", { xPercent: 0 });
    }
  }
}, "-=0.5")
.to(".carousel-slide .image-container img", {
  scale: 1,
  autoAlpha: 1,
  duration: 1.8,
  stagger: { 
    amount: 0.6,
    from: "end" // Changed stagger direction
  },
  ease: "power3.out"
}, "-=1");

// Carousels
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  let currentIndex = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  dotsContainer.children[0].classList.add('active');

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelector('.carousel-dots .active')?.classList.remove('active');
    dotsContainer.children[currentIndex].classList.add('active');
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });
});

document.querySelectorAll('.tour-carousel-container').forEach(carousel => {
  const track = carousel.querySelector('.tour-carousel-track');
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');

  prev.addEventListener('click', () => {
    track.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  });

  next.addEventListener('click', () => {
    track.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  });
});

// Simplified and optimized blog animations
gsap.fromTo("#blog", 
  {
    opacity: 0,
    y: 100
  },
  {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#blog",
      start: "top 85%",
      end: "top 50%",
      toggleActions: "play none none none"
    },
    onComplete: () => {
      // Animate text elements after section appears
      gsap.utils.toArray(".blog-item").forEach((item, index) => {
        gsap.fromTo(item.querySelectorAll('h1, h5, h6'), 
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            stagger: 0.15,
            ease: "back.out(1.2)",
            overwrite: "auto"
          }
        );
      });
    }
  }
);

// Remove duplicate animations and keep only this version

// Contact Section Animation
const contactTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 80%",
    end: "top 50%",
    toggleActions: "play none none none"
  }
});

contactTimeline.from(".contact-container", {
  y: -100,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out"
})
.from(".contact-header h2", {
  y: -50,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
}, "+=0.2")
.from(".contact-header p", {
  y: -30,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out"
}, "-=0.3")
.from(".input-group", {
  y: -40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: "back.out(1.2)"
}, "-=0.2")
.from("button[type='submit']", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: "elastic.out(1, 0.5)"
}, "-=0.3")
.from(".social-icon", {
  y: -30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: "power4.out"
}, "-=0.2");

// Map Section Animation
gsap.fromTo("#location-map", 
  { autoAlpha: 0, y: 50 },
  {
    autoAlpha: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#location-map",
      start: "top 80%",
      end: "top 50%",
      toggleActions: "play none none none"
    }
  }
);

gsap.fromTo(".genesis-footer", {
  y: 100,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".genesis-footer",
    start: "top 90%",
    end: "top 50%",
    toggleActions: "play none none none"
  },
  onComplete: () => {
    gsap.to(".footer-content > *", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });
  }
});

// Final initialization
window.addEventListener('load', () => {
  initAnimations();
  initTakeTourAnimations();
  
  // Force ScrollTrigger refresh after all elements are loaded
  setTimeout(() => {
    ScrollTrigger.refresh();
    window.scrollTo(0, 0);
  }, 1000);
});