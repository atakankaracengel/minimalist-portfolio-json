async function fetchData(url, retryCount = 3, delay = 1000) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    if (retryCount > 0) {
      console.warn(`Retrying ${url} (${retryCount} attempts left)...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchData(url, retryCount - 1, delay);
    } else {
      throw error;
    }
  }
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".automatic-content");
  sections.forEach((section) => {
    section.classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");
}

(async () => {
  try {
    const portfolioFiles = await fetchData(
      "../jsons/portfolio/portfolio-files.json"
    );
    const portfolioSection = document.getElementById("portfolio");

    const portfolioItems = await Promise.all(
      portfolioFiles.map(async (file) => {
        const data = await fetchData(`../jsons/portfolio/${file}`);
        return data;
      })
    );

    const renderPortfolioItems = () => {
      portfolioSection.innerHTML = `
          <div class="portfolio-container">
            ${portfolioItems
              .map(
                (item, index) => `
                <div class="portfolio-item" data-index="${index}">
                  ${
                    item.coverImage
                      ? `<img src="${item.coverImage}" alt="${item.title}" />`
                      : `<img src="https://via.placeholder.com/256" alt="Default Image" />`
                  }
                  <h3>${item.title}</h3>
                  ${item.description ? `<p>${item.description}</p>` : ""}
                  <a href="#" class="detail-button">İncele</a>
                </div>`
              )
              .join("")}
          </div>
        `;
      bindDetailButtons();
    };

    const bindDetailButtons = () => {
      document
        .querySelectorAll(".detail-button, .portfolio-item img")
        .forEach((element) => {
          element.addEventListener("click", (event) => {
            event.preventDefault();
            const index = event.target.closest(".portfolio-item").dataset.index;
            const item = portfolioItems[index];
            const detailSection = document.getElementById("portfolio");

            const content = `
              <button class="back-button">Geri</button>
              <h2>${item.title}</h2>
              <div class="images">
                ${item.images
                  .map(
                    (image, imgIndex) =>
                      `<img src="${image}" alt="${item.title}" data-index="${imgIndex}" />`
                  )
                  .join("")}
              </div>
              <div>${item.htmlDescription}</div>
            `;
            detailSection.innerHTML = content;
            detailSection.classList.add("detail-view");

            bindImageClickEvents(item.images);

            document
              .querySelector(".back-button")
              .addEventListener("click", () => {
                detailSection.classList.remove("detail-view");
                renderPortfolioItems();
              });
          });
        });
    };

    const bindImageClickEvents = (images) => {
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");
      const lightboxCounter = document.getElementById("lightbox-counter");
      const prevBtn = document.getElementById("lightbox-prev");
      const nextBtn = document.getElementById("lightbox-next");
      const closeBtn = document.getElementById("lightbox-close");

      let currentImageIndex;

      document.querySelectorAll(".detail-view .images img").forEach((img) => {
        img.addEventListener("click", () => {
          currentImageIndex = parseInt(img.dataset.index);
          lightboxImg.src = images[currentImageIndex];
          lightbox.classList.add("active");
          updateCounter();
        });
      });

      const showImage = (index) => {
        currentImageIndex = (index + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex];
        updateCounter();
      };

      const updateCounter = () => {
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${
          images.length
        }`;
      };

      prevBtn.addEventListener("click", () => {
        showImage(currentImageIndex - 1);
      });

      nextBtn.addEventListener("click", () => {
        showImage(currentImageIndex + 1);
      });

      closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("active");
      });

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove("active");
        }
      });
    };

    renderPortfolioItems();
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }
})();
