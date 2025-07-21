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
  // Mobile: tạo hình ảnh ngẫu nhiên rơi xuống
  function createRandomFallingImage() {
    const img = document.createElement("img");
    img.classList.add("image-trail");
    img.src = images[currentImageIndex];
    mouseContainer.appendChild(img);
    currentImageIndex = (currentImageIndex + 1) % images.length;

    // Vị trí ngẫu nhiên trên màn hình
    const randomX = Math.random() * (window.innerWidth - 80); // -80 để không bị cắt hình
    const startY = -80; // Bắt đầu từ trên cùng

    gsap.set(img, {
      x: randomX,
      y: startY,
      scale: 0,
      opacity: 0,
      rotation: gsap.utils.random(-20, 20),
    });

    // Hiện hình và rơi xuống
    gsap.to(img, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(img, {
      y: window.innerHeight + 80, // Rơi xuống dưới màn hình
      duration: 2,
      ease: "power2.in",
    });

    gsap.to(img, {
      scale: 0.2,
      opacity: 0,
      duration: 0.5,
      delay: 1.5,
      ease: "power2.in",
      onComplete: () => {
        img.remove();
      },
    });
  }

  // Tạo hình ảnh rơi mỗi 1-3 giây
  function startRandomImageFall() {
    createRandomFallingImage();
    const nextDelay = Math.random() * 2000 + 1000; // 1-3 giây
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
