document.addEventListener("DOMContentLoaded", () => {
  const introOverlay = document.getElementById("introOverlay")
  const skipIntro = document.getElementById("skipIntro")
  const mainNav = document.getElementById("mainNav")

  // Check if intro has been viewed in this session
  const introViewed = sessionStorage.getItem("introViewed")

  if (!introViewed) {
    // Show intro
    console.log("Showing intro overlay")
    introOverlay.style.display = "flex"
    document.body.style.overflow = "hidden"

    if (mainNav) {
      mainNav.style.opacity = "0"
      mainNav.style.pointerEvents = "none"
    }

    // Auto-hide after 6.5 seconds
    const autoHideTimer = setTimeout(() => {
      hideIntro()
    }, 6500)

    // Skip button
    skipIntro.addEventListener("click", function handleSkipClick() {
      console.log("Skip button clicked")
      clearTimeout(autoHideTimer)
      hideIntro()
      skipIntro.removeEventListener("click", handleSkipClick)
    })

    // Escape key to skip
    document.addEventListener("keydown", function handleEscape(e) {
      if (e.key === "Escape") {
        clearTimeout(autoHideTimer)
        hideIntro()
        document.removeEventListener("keydown", handleEscape)
      }
    })
  } else {
    // Hide intro immediately
    introOverlay.style.display = "none"
    if (mainNav) {
      mainNav.style.opacity = "1"
      mainNav.style.pointerEvents = "auto"
    }
  }

  function hideIntro() {
    const introOverlay = document.getElementById("introOverlay")
    const mainNav = document.getElementById("mainNav")

    introOverlay.classList.add("hidden")
    document.body.style.overflow = ""

    if (mainNav) {
      mainNav.style.opacity = "1"
      mainNav.style.pointerEvents = "auto"
    }

    sessionStorage.setItem("introViewed", "true")

    setTimeout(() => {
      introOverlay.style.display = "none"
      console.log("Intro completely hidden")
    }, 1200)
  }

  // Initialize all features after intro
  initializeAllFeatures()
})

// Theme toggle
const themeToggle = document.getElementById("themeToggle")
const body = document.body

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", savedTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.style.transition = "background-color 0.6s ease, color 0.6s ease"
  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  console.log("Theme changed to:", newTheme)
})

// Initialize all features
function initializeAllFeatures() {
  setupNavigation()
  setupHeroImage()
  setupVideos()
  setupSoundSystem()
  setupAnimations()
  setupCards()
}

// Smooth scrolling for navigation
function setupNavigation() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offset = 80
        const targetPosition = targetSection.offsetTop - offset

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Update active link
        document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
        link.classList.add("active")
      }
    })
  })

  // Hero CTA button
  document.querySelector(".hero-cta")?.addEventListener("click", () => {
    document.querySelector("#about").scrollIntoView({ behavior: "smooth" })
  })

  // Update active nav link on scroll
  const sections = document.querySelectorAll(".section, .hero")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })

    // Hide scroll indicator after scrolling
    const scrollIndicator = document.querySelector(".scroll-indicator")
    if (scrollIndicator) {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = "0"
      } else {
        scrollIndicator.style.opacity = "1"
      }
    }
  })
}

// Random hero image
function setupHeroImage() {
  const heroImages = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg",
    "img6.jpg",
    "img7.jpg",
    "img8.jpg",
    "img9.jpg",
    "img10.jpg",
  ]

  function setRandomHeroImage() {
    const heroImage = document.getElementById("heroImage")
    if (!heroImage) return

    const randomIndex = Math.floor(Math.random() * heroImages.length)
    const selectedImage = heroImages[randomIndex]

    const img = new Image()
    img.onload = () => {
      heroImage.src = selectedImage
      heroImage.classList.add("loaded")
    }
    img.onerror = () => {
      heroImage.src = "img1.jpg"
      heroImage.classList.add("loaded")
    }
    img.src = selectedImage
  }

  setRandomHeroImage()
}

// Setup background videos with local files
function setupVideos() {
  const videoSources = [
    "video1.mp4",
    "video2.mp4",
    "video3.mp4",
    "video4.mp4",
    "video6.mp4",
    "video7.mp4",
    "video8.mp4",
    "video10.mp4",
  ]

  const writingVideo = document.getElementById("writingVideo")
  const experienceVideo = document.getElementById("experienceVideo")
  const contactVideo = document.getElementById("contactVideo")

  let usedVideos = []

  function getRandomVideo() {
    if (usedVideos.length >= videoSources.length) {
      usedVideos = []
    }

    const availableVideos = videoSources.filter((video) => !usedVideos.includes(video))

    if (availableVideos.length === 0) {
      usedVideos = []
      return videoSources[Math.floor(Math.random() * videoSources.length)]
    }

    const randomIndex = Math.floor(Math.random() * availableVideos.length)
    const selectedVideo = availableVideos[randomIndex]

    usedVideos.push(selectedVideo)

    return selectedVideo
  }

  function loadVideo(videoElement, sectionName) {
    const videoSrc = getRandomVideo()
    console.log(`${sectionName} video: ${videoSrc}`)

    const source = videoElement.querySelector("source")
    source.src = videoSrc

    videoElement.load()

    videoElement.addEventListener("loadeddata", () => {
      console.log(`${sectionName} video loaded successfully`)
      videoElement.play().catch((e) => {
        console.log(`${sectionName} video autoplay prevented:`, e)
      })
    })

    videoElement.onerror = () => {
      console.log(`${sectionName} video failed to load: ${videoSrc}`)
      const fallbackVideo = getRandomVideo()
      source.src = fallbackVideo
      videoElement.load()
    }
  }

  if (writingVideo) loadVideo(writingVideo, "Writing")
  if (experienceVideo) loadVideo(experienceVideo, "Experience")
  if (contactVideo) loadVideo(contactVideo, "Contact")

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target
        if (entry.isIntersecting) {
          video.play().catch((e) => console.log("Video play error:", e))
        } else {
          video.pause()
        }
      })
    },
    { threshold: 0.3 },
  )
  ;[writingVideo, experienceVideo, contactVideo].forEach((video) => {
    if (video) videoObserver.observe(video)
  })
}

function setupSoundSystem() {
  const soundToggle = document.getElementById("soundToggle")
  const backgroundMusic = document.getElementById("backgroundMusic")

  if (!soundToggle || !backgroundMusic) {
    console.log("Sound elements not found")
    return
  }

  let isSoundPlaying = false
  let currentMusicIndex = -1
  let userInteracted = false

  const musicTracks = [
    { name: "Ambient 1", url: "audio1.mp3" },
    { name: "Ambient 2", url: "audio2.mp3" },
    { name: "Ambient 3", url: "audio3.mp3" },
    { name: "Ambient 4", url: "audio4.mp3" },
    { name: "Ambient 5", url: "audio5.mp3" },
  ]

  function getRandomMusic() {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * musicTracks.length)
    } while (newIndex === currentMusicIndex && musicTracks.length > 1)

    currentMusicIndex = newIndex
    return musicTracks[currentMusicIndex]
  }

  function playRandomMusic() {
    const music = getRandomMusic()
    console.log(`Playing: ${music.name}`)

    backgroundMusic.src = music.url
    backgroundMusic.volume = 0.15
    backgroundMusic.loop = true

    const playPromise = backgroundMusic.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isSoundPlaying = true
          soundToggle.classList.add("active")
          showSoundNotification(`♪ ${music.name}`)
          console.log("Music started successfully")
        })
        .catch((error) => {
          console.log("Audio playback failed:", error)
          showSoundNotification("Click sound button again to play")
          soundToggle.classList.remove("active")
          isSoundPlaying = false
        })
    }
  }

  function stopMusic() {
    backgroundMusic.pause()
    backgroundMusic.currentTime = 0
    isSoundPlaying = false
    soundToggle.classList.remove("active")
    showSoundNotification("Sound paused")
    console.log("Music stopped")
  }

  soundToggle.addEventListener("click", (e) => {
    e.stopPropagation()
    userInteracted = true
    console.log("Sound toggle clicked, playing:", isSoundPlaying)

    if (!isSoundPlaying) {
      playRandomMusic()
    } else {
      stopMusic()
    }
  })

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && isSoundPlaying) {
      backgroundMusic.pause()
    } else if (!document.hidden && isSoundPlaying && backgroundMusic.paused) {
      backgroundMusic.play().catch((e) => console.log("Resume failed:", e))
    }
  })

  function showSoundNotification(message) {
    const existing = document.querySelector(".sound-notification")
    if (existing) existing.remove()

    const notification = document.createElement("div")
    notification.className = "sound-notification"
    notification.textContent = message
    notification.style.animation = "fadeInUp 0.3s ease-out"

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease-out forwards"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  // Enable audio on first user interaction
  const enableAudio = () => {
    if (!userInteracted) {
      userInteracted = true
    }
    document.removeEventListener("click", enableAudio)
    document.removeEventListener("touchstart", enableAudio)
  }

  document.addEventListener("click", enableAudio, { once: true })
  document.addEventListener("touchstart", enableAudio, { once: true })
}

// Setup animations
function setupAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        if (entry.target.classList.contains("about-lines")) {
          const lines = entry.target.querySelectorAll(".about-line, .about-line-accent")
          lines.forEach((line, index) => {
            setTimeout(() => {
              line.style.animation = `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`
            }, 100)
          })
        }
      }
    })
  }, observerOptions)

  document.querySelectorAll(".fade-in, .about-lines, .contact-text, .contact-links, .editorial-card").forEach((el) => {
    observer.observe(el)
  })

  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.8) {
        el.classList.add("visible")
      }
    })
  }, 500)
}

// Setup cards functionality
function setupCards() {
  const randomBtn = document.querySelector(".random-btn")
  const editorialCards = document.querySelectorAll(".editorial-card")

  if (randomBtn && editorialCards.length > 0) {
    randomBtn.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * editorialCards.length)
      editorialCards[randomIndex].scrollIntoView({ behavior: "smooth", block: "center" })

      editorialCards[randomIndex].style.background = "rgba(122, 155, 127, 0.15)"
      setTimeout(() => {
        editorialCards[randomIndex].style.background = ""
      }, 2500)
    })
  }

  editorialCards.forEach((card) => {
    card.addEventListener("click", () => {
      const url = card.getAttribute("data-article-url")
      if (url) {
        window.open(url, "_blank")
      }
    })
  })
}

window.addEventListener("resize", () => {
  const videos = document.querySelectorAll(".section-bg-video")
  videos.forEach((video) => {
    if (video.paused) {
      video.play().catch((e) => console.log("Video play error:", e))
    }
  })
})

