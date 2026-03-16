document.addEventListener("DOMContentLoaded", function () {

  const images = document.querySelectorAll(".photo-img");

  images.forEach(function(img){

    EXIF.getData(img, function(){

      const lat = EXIF.getTag(this, "GPSLatitude");
      const lon = EXIF.getTag(this, "GPSLongitude");
      const latRef = EXIF.getTag(this, "GPSLatitudeRef");
      const lonRef = EXIF.getTag(this, "GPSLongitudeRef");

      function convertDMSToDD(dms, ref) {
        let dd = dms[0] + dms[1]/60 + dms[2]/3600;
        if (ref === "S" || ref === "W") dd = dd * -1;
        return dd;
      }

      if(lat && lon){

        const latitude = convertDMSToDD(lat, latRef);
        const longitude = convertDMSToDD(lon, lonRef);

        const mapContainer = img.closest(".photo-card").querySelector(".photo-map");

        if(mapContainer){

          const map = L.map(mapContainer).setView([latitude, longitude], 10);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap"
          }).addTo(map);

          L.marker([latitude, longitude]).addTo(map);

        }

      }

    });

  });

});