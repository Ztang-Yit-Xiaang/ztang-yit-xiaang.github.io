document.addEventListener("DOMContentLoaded", function () {

  const images = document.querySelectorAll(".photo-img");

  images.forEach(function(img){

    EXIF.getData(img, function(){

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

      const container = img.closest(".photo-card").querySelector(".photo-exif");

      if(container){
        container.innerHTML = exifHTML;
      }

    });

  });

});