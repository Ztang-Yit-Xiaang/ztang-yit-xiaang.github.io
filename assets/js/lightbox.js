document.addEventListener("DOMContentLoaded", function () {

  const links = document.querySelectorAll(".lightbox-link");
  const overlay = document.getElementById("lightbox-overlay");
  const imgViewer = document.getElementById("lightbox-image");
  const closeBtn = document.getElementById("lightbox-close");

  const photoImgs = document.querySelectorAll(".photo-img");

  let currentIndex = 0;
  const images = [];

  let scale = 1;
  let originX = 0;
  let originY = 0;
  let isDragging = false;

  /* -------------------
     LIGHTBOX SETUP
  ------------------- */

  links.forEach((link, index) => {

    images.push(link.href);

    link.addEventListener("click", function(e){

      e.preventDefault();

      currentIndex = index;
      openLightbox();

    });

  });

  function openLightbox(){

    overlay.style.display = "flex";
    imgViewer.src = images[currentIndex];

    scale = 1;
    imgViewer.style.transform = "scale(1)";
    document.body.style.overflow = "hidden";

  }

  function closeLightbox(){

    overlay.style.display = "none";
    document.body.style.overflow = "auto";

  }

  function showNext(){

    currentIndex = (currentIndex + 1) % images.length;
    imgViewer.src = images[currentIndex];

  }

  function showPrev(){

    currentIndex = (currentIndex - 1 + images.length) % images.length;
    imgViewer.src = images[currentIndex];

  }

  if(closeBtn){
    closeBtn.addEventListener("click", closeLightbox);
  }

  overlay.addEventListener("click", function(e){

    if(e.target === overlay){
      closeLightbox();
    }

  });

  document.addEventListener("keydown", function(e){

    if(overlay.style.display === "flex"){

      if(e.key === "Escape") closeLightbox();
      if(e.key === "ArrowRight") showNext();
      if(e.key === "ArrowLeft") showPrev();

    }

  });

  /* -------------------
     MOUSE WHEEL ZOOM
  ------------------- */

  imgViewer.addEventListener("wheel", function(e){

    e.preventDefault();

    const zoomSpeed = 0.1;

    if(e.deltaY < 0){
      scale += zoomSpeed;
    } else {
      scale -= zoomSpeed;
    }

    scale = Math.min(Math.max(1, scale), 5);

    imgViewer.style.transform = `scale(${scale})`;

  });

  /* -------------------
     DRAG TO PAN
  ------------------- */

  imgViewer.addEventListener("mousedown", function(e){

    isDragging = true;
    originX = e.clientX;
    originY = e.clientY;

    imgViewer.style.cursor = "grabbing";

  });

  document.addEventListener("mousemove", function(e){

    if(!isDragging) return;

    const dx = e.clientX - originX;
    const dy = e.clientY - originY;

    imgViewer.style.transform =
      `scale(${scale}) translate(${dx}px, ${dy}px)`;

  });

  document.addEventListener("mouseup", function(){

    isDragging = false;
    imgViewer.style.cursor = "grab";

  });


  /* -------------------
     EXIF DATA
  ------------------- */

  photoImgs.forEach(function(photo){

    if(typeof EXIF === "undefined") return;

    EXIF.getData(photo, function(){

      const camera = EXIF.getTag(this, "Model");
      const lens = EXIF.getTag(this, "LensModel");
      const iso = EXIF.getTag(this, "ISOSpeedRatings");
      const aperture = EXIF.getTag(this, "FNumber");
      const shutter = EXIF.getTag(this, "ExposureTime");

      let exifHTML = "";

      if(camera) exifHTML += `📷 ${camera} `;
      if(lens) exifHTML += `🔍 ${lens} `;
      if(iso) exifHTML += `ISO ${iso} `;
      if(aperture) exifHTML += `f/${aperture.numerator/aperture.denominator} `;
      if(shutter) exifHTML += `⏱ ${shutter.numerator}/${shutter.denominator}s`;

      const container = photo.closest(".photo-card").querySelector(".photo-exif");

      if(container && exifHTML !== ""){
        container.innerHTML = exifHTML;
      }

    });

  });

});