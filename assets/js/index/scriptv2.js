const hiddenImages = document.querySelectorAll(".hidden-images img");
const images = Array.from(hiddenImages).map((img) => img.src);

const mouseContainer = document.querySelector(".mouse-trail");
let currentImageIndex = 0;
let lastX = 0;
let lastY = 0;
let distanceThreshold = window.innerWidth < 991 ? 100 : 140;

// Kiểm tra xem có phải mobile không
const isMobile = window.innerWidth < 991;

if (isMobile) {
  // Mobile: tạo hình ảnh ngẫu nhiên xuất hiện và biến mất
  function createRandomFallingImage() {
    const img = document.createElement("img");
    img.classList.add("image-trail");
    img.src = images[currentImageIndex];
    mouseContainer.appendChild(img);
    currentImageIndex = (currentImageIndex + 1) % images.length;

    // Vị trí ngẫu nhiên trên màn hình
    const randomX = Math.random() * (window.innerWidth - 100); // -80 để không bị cắt hình
    const randomY = Math.random() * (window.innerHeight - 100); // -80 để không bị cắt hình

    gsap.set(img, {
      x: randomX,
      y: randomY,
      scale: 0,
      opacity: 0,
      rotation: gsap.utils.random(-20, 20),
    });

    // Hiện hình
    gsap.to(img, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Biến mất sau 1 khoảng thời gian
    gsap.to(img, {
      scale: 0.2,
      opacity: 0,
      duration: 1,
      delay: 0.8,
      ease: "power2.in",
      onComplete: () => {
        img.remove();
      },
    });
  }

  function startRandomImageFall() {
    createRandomFallingImage();

    const nextDelay = Math.random() * 1000 + 700;
    setTimeout(startRandomImageFall, nextDelay);
  }

  // Bắt đầu hiệu ứng
  startRandomImageFall();
} else {
  // Desktop: giữ nguyên hiệu ứng theo chuột
  window.addEventListener("mousemove", (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > distanceThreshold) {
      createTrail(e.clientX, e.clientY);
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });
}

function createTrail(x, y) {
  const img = document.createElement("img");
  img.classList.add("image-trail");
  img.src = images[currentImageIndex];
  mouseContainer.appendChild(img);
  currentImageIndex = (currentImageIndex + 1) % images.length;

  gsap.set(img, {
    x: x - 40, // Center the image
    y: y - 40,
    scale: 0,
    opacity: 0,
    rotation: gsap.utils.random(-20, 20),
  });

  gsap.to(img, {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  });

  gsap.to(img, {
    scale: 0.2,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.in",
    onComplete: () => {
      img.remove();
    },
  });
}
