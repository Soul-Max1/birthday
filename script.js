/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.style.display = "none";

        }, 700);

    }, 3000);

});


/* ==========================================
   ELEMENTS
========================================== */

const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");
const song = document.getElementById("birthdaySong");
const typewriter = document.getElementById("typewriter");


/* ==========================================
   MESSAGE
========================================== */

const birthdayMessage = `

Happiest Birthday to you! 🎂❤️

I pray that your life is always filled with happiness, peace, and endless smiles.

May this year bring you everything your heart has been wishing for.

Keep shining, keep smiling, and have a beautiful birthday! ✨😊

With lots of love ❤️

`;


/* ==========================================
   TYPEWRITER
========================================== */

let index = 0;
let typingStarted = false;

function typeWriter() {

    if (index < birthdayMessage.length) {

        typewriter.innerHTML += birthdayMessage.charAt(index);

        index++;

        setTimeout(typeWriter, 35);

    }

}

function playMusic() {
    if (playing) return;

    song.volume = 0.6;

    song.play().then(() => {
        musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }).catch(() => {
        musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    });
}


/* ==========================================
   START BUTTON
========================================== */

startBtn.addEventListener("click", async () => {

    startBtn.disabled = true;

    startBtn.innerHTML =
        `<i class="fa-solid fa-heart"></i> Enjoy Your Surprise`;

    startBtn.style.opacity = ".8";

    if (!typingStarted) {

        typingStarted = true;

        typeWriter();

    }

    document.getElementById("message").scrollIntoView({
        behavior: "smooth"
    });

    try {

        await song.play();

        musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

    }

    catch (err) {

        console.log(err);

    }

    if (typeof confetti === "function") {

        confetti({

            particleCount:180,

            spread:120,

            origin:{
                y:0.6
            }

        });

    }

});


/* ==========================================
   MUSIC BUTTON
========================================== */

let playing = false;

musicBtn.addEventListener("click", async () => {

    if (playing) {

        song.pause();

        playing = false;

        musicBtn.innerHTML =
            '<i class="fa-solid fa-music"></i>';

    }

    else {

        try {

            await song.play();

            playing = true;

            musicBtn.innerHTML =
                '<i class="fa-solid fa-volume-high"></i>';

        }

        catch (err) {

            console.log(err);

        }

    }

});


/* ==========================================
   MUSIC ENDED
========================================== */

song.addEventListener("play", () => {

    playing = true;

});

song.addEventListener("pause", () => {

    playing = false;

});


/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", e => {

        const id = link.getAttribute("href");

        if (!id.startsWith("#")) return;

        e.preventDefault();

        document.querySelector(id).scrollIntoView({

            behavior: "smooth"

        });

    });

});
/* ==========================================
   FLOATING HEARTS
========================================== */

const heartsContainer = document.getElementById("hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = ["❤️", "💖", "💕", "💗", "💞"][Math.floor(Math.random() * 5)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = (18 + Math.random() * 18) + "px";

    heart.style.animationDuration = (8 + Math.random() * 8) + "s";

    heart.style.animationDelay = Math.random() * 2 + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 16000);

}

setInterval(createHeart, 350);



/* ==========================================
   FLOATING BALLOONS
========================================== */

const balloonContainer = document.getElementById("balloons");

function createBalloon() {

    const balloon = document.createElement("div");

    balloon.className = "balloon";

    balloon.style.left = Math.random() * 100 + "%";

    balloon.style.animationDuration = (12 + Math.random() * 10) + "s";

    balloon.style.transform =
        `scale(${0.8 + Math.random() * 0.5})`;

    balloonContainer.appendChild(balloon);

    setTimeout(() => {

        balloon.remove();

    }, 22000);

}

setInterval(createBalloon, 1800);



/* ==========================================
   SPARKLES
========================================== */

const sparkleContainer = document.getElementById("sparkles");

function createSparkle() {

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left = Math.random() * 100 + "%";

    sparkle.style.top = Math.random() * 100 + "%";

    sparkle.style.animationDuration =
        (1 + Math.random() * 3) + "s";

    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {

        sparkle.remove();

    }, 4000);

}

setInterval(createSparkle, 200);



/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(

    "#message, #memory, #gallery, #qr-section, #ending"

);

revealElements.forEach(section => {

    section.classList.add("fade");

});

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

revealElements.forEach(section => {

    observer.observe(section);

});



/* ==========================================
   PARALLAX BACKGROUND
========================================== */

window.addEventListener("mousemove", e => {

    const x = (window.innerWidth / 2 - e.clientX) / 40;

    const y = (window.innerHeight / 2 - e.clientY) / 40;

    document.body.style.backgroundPosition =
        `${x}px ${y}px`;

});



/* ==========================================
   RANDOM LOVE QUOTES
========================================== */

const quotes = [

    "Keep smiling because today is all about you ❤️",

    "May every dream you have come true ✨",

    "Your smile makes the world brighter 🌸",

    "You deserve all the happiness today and always 💖",

    "Stay blessed, stay happy, stay amazing ❤️"

];

setInterval(() => {

    const subtitle = document.querySelector(".glass-card p");

    if (!subtitle) return;

    subtitle.style.opacity = "0";

    setTimeout(() => {

        subtitle.innerText =
            quotes[Math.floor(Math.random() * quotes.length)];

        subtitle.style.opacity = "1";

    }, 500);

}, 7000);



/* ==========================================
   IMAGE HOVER & LIGHTBOX MODAL EFFECT
========================================== */

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".modal-close");

document.querySelectorAll(".gallery-grid img").forEach(image => {

    image.addEventListener("click", () => {

        image.style.transform = "scale(1.05)";

        setTimeout(() => {

            image.style.transform = "";

        }, 300);

        if (modal && modalImg) {
            modal.style.display = "flex";
            modalImg.src = image.src;
            modalImg.alt = image.alt;
        }

    });

});

if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target === closeModal) {
            modal.style.display = "none";
        }
    });
}
/* ==========================================
   CONTINUOUS CONFETTI
========================================== */

let celebrationStarted = false;

function startCelebration() {

    if (celebrationStarted) return;

    celebrationStarted = true;

    const duration = 15000;
    const animationEnd = Date.now() + duration;

    (function frame() {

        confetti({
            particleCount: 3,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 3,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });

        if (Date.now() < animationEnd) {

            requestAnimationFrame(frame);

        }

    })();

}

/* ==========================================
   FIREWORKS
========================================== */

function launchFirework() {

    confetti({

        particleCount:150,

        spread:360,

        startVelocity:55,

        ticks:250,

        origin:{

            x:Math.random(),

            y:Math.random()*0.5

        }

    });

}

function fireworksShow() {

    let count = 0;

    const fireworkInterval = setInterval(() => {

        launchFirework();

        count++;

        if(count >= 12){

            clearInterval(fireworkInterval);

        }

    },700);

}

/* ==========================================
   FLOWER PETALS
========================================== */

function createPetal(){

    const petal = document.createElement("div");

    petal.innerHTML = "🌸";

    petal.style.position="fixed";

    petal.style.left=Math.random()*100+"vw";

    petal.style.top="-40px";

    petal.style.fontSize=(20+Math.random()*20)+"px";

    petal.style.pointerEvents="none";

    petal.style.zIndex="999";

    petal.style.transition="transform 8s linear";

    document.body.appendChild(petal);

    setTimeout(()=>{

        petal.style.transform=
        `translateY(${window.innerHeight+100}px)
         translateX(${Math.random()*200-100}px)
         rotate(${720*Math.random()}deg)`;

    },100);

    setTimeout(()=>{

        petal.remove();

    },9000);

}

setInterval(createPetal,600);

/* ==========================================
   CELEBRATION START
========================================== */

startBtn.addEventListener("click",()=>{

    startCelebration();

    setTimeout(()=>{

        fireworksShow();

    },5000);

});

/* ==========================================
   SCROLL TO MESSAGE
========================================== */

startBtn.addEventListener("click",()=>{

    setTimeout(()=>{

        document.getElementById("message")
        .scrollIntoView({

            behavior:"smooth"

        });

    },1200);

});

/* ==========================================
   GALLERY ANIMATION
========================================== */

const galleryImages=document.querySelectorAll(".gallery-grid img");

galleryImages.forEach((img,index)=>{

    img.style.animationDelay=index*.25+"s";

    img.animate([

        {

            opacity:0,

            transform:"translateY(60px)"

        },

        {

            opacity:1,

            transform:"translateY(0)"

        }

    ],{

        duration:1200,

        fill:"forwards"

    });

});

/* ==========================================
   END MESSAGE
========================================== */

const ending=document.querySelector("#ending h1");

window.addEventListener("scroll",()=>{

    const trigger=ending.getBoundingClientRect().top;

    if(trigger<window.innerHeight-150){

        confetti({

            particleCount:250,

            spread:180,

            origin:{

                y:.65

            }

        });

    }

});

/* ==========================================
   MUSIC FADE
========================================== */

window.addEventListener("beforeunload",()=>{

    const fade=setInterval(()=>{

        if(song.volume>0.05){

            song.volume-=0.05;

        }

        else{

            song.pause();

            clearInterval(fade);

        }

    },120);

});

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(

`❤️
Happy Birthday Nandni ❤️

Have a beautiful birthday!
❤️`

);

/* ==========================================
   QR CODE GENERATOR & MODAL
========================================== */

const qrImage = document.getElementById("qrImage");
const modalQrImage = document.getElementById("modalQrImage");
const qrUrlInput = document.getElementById("qrUrlInput");
const copyUrlBtn = document.getElementById("copyUrlBtn");
const qrBtn = document.getElementById("qrBtn");
const qrModal = document.getElementById("qrModal");
const qrModalClose = document.querySelector(".qr-modal-close");
const downloadQrBtn = document.getElementById("downloadQrBtn");
const modalDownloadQrBtn = document.getElementById("modalDownloadQrBtn");

function getInitialUrl() {
    if (window.location.protocol.startsWith("http")) {
        return window.location.href;
    }
    return "https://birthday-five-chi-63.vercel.app/";
}

function updateQrCode(targetUrl) {
    if (!targetUrl || targetUrl.trim() === "") {
        targetUrl = getInitialUrl();
    }
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(targetUrl.trim())}`;
    
    if (qrImage) qrImage.src = apiUrl;
    if (modalQrImage) modalQrImage.src = apiUrl;
    if (downloadQrBtn) downloadQrBtn.href = apiUrl;
    if (modalDownloadQrBtn) modalDownloadQrBtn.href = apiUrl;
}

if (qrUrlInput) {
    const defaultUrl = getInitialUrl();
    qrUrlInput.value = defaultUrl;
    updateQrCode(defaultUrl);

    qrUrlInput.addEventListener("input", (e) => {
        updateQrCode(e.target.value);
    });
}

if (copyUrlBtn && qrUrlInput) {
    copyUrlBtn.addEventListener("click", () => {
        const textToCopy = qrUrlInput.value || getInitialUrl();
        navigator.clipboard.writeText(textToCopy).then(() => {
            const orig = copyUrlBtn.innerHTML;
            copyUrlBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => {
                copyUrlBtn.innerHTML = orig;
            }, 2000);
        }).catch(err => {
            console.error("Could not copy link: ", err);
        });
    });
}

if (qrBtn && qrModal) {
    qrBtn.addEventListener("click", () => {
        qrModal.style.display = "flex";
    });
}

if (qrModalClose && qrModal) {
    qrModalClose.addEventListener("click", () => {
        qrModal.style.display = "none";
    });

    qrModal.addEventListener("click", (e) => {
        if (e.target === qrModal || e.target === qrModalClose) {
            qrModal.style.display = "none";
        }
    });
}