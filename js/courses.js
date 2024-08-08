document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchData("../jsons/courses.json");
    const coursesSection = document.getElementById("courses");
    const completedCoursesResume = document.getElementById(
      "completedCoursesResume"
    );
    coursesSection.innerHTML = `
        <h2>Eğitimlerim</h2>
        <h3>Tamamlanan Kurslar</h3>
        <ul>
          ${data.completedCourses
            .map(
              (course, index) => `
                <li>
                  <div class="course-text" id="course-text-${index}" onclick="toggleCertificate(${index})">
                    ${course.name} - <i>${course.platform}</i>
                    ${
                      course.startDate
                        ? `<span class="date-info">(Başlangıç Tarihi: ${
                            course.startDate
                          } - ${
                            course.endDate
                              ? "Bitiş Tarihi: " + course.endDate
                              : "Devam Ediyor"
                          })</span>`
                        : `<span class="date-info">(Bitiş Tarihi: ${
                            course.endDate ? course.endDate : "Devam Ediyor"
                          })</span>`
                    }
                  </div>
                  <div class="certificate-container">
                    <div class="certificate-preview" id="certificate-preview-${index}">
                      <iframe src="${course.certificateUrl}"></iframe>
                    </div>
                  </div>
                </li>`
            )
            .join("")}
        </ul>
        <h3>Devam Eden Kurslar</h3>
        ${data.ongoingCourses
          .map(
            (course) => `
              <div>
                <p>${course.name} - <i>${course.platform}</i>
                  ${
                    course.startDate
                      ? `<span class="date-info">(Başlangıç Tarihi: ${
                          course.startDate
                        } - ${
                          course.endDate
                            ? "Bitiş Tarihi: " + course.endDate
                            : "Devam Ediyor"
                        })</span>`
                      : `<span class="date-info">(Bitiş Tarihi: ${
                          course.endDate ? course.endDate : "Devam Ediyor"
                        })</span>`
                  }
                </p>
                <div class="progress-bar">
                  <div class="progress-bar-inner" style="width: ${
                    course.completion
                  }%;">${course.completion}%</div>
                </div>
              </div>`
          )
          .join("")}
      `;
    completedCoursesResume.innerHTML = data.completedCourses
      .map(
        (course) => `
            <li>
              ${course.name} - <i>${course.platform}</i>
            </li>`
      )
      .join("");
  } catch (error) {
    console.error("Error fetching courses data:", error);
  }
});

function toggleCertificate(index) {
  const courseText = document.getElementById(`course-text-${index}`);
  const certificatePreview = document.getElementById(
    `certificate-preview-${index}`
  );
  if (
    certificatePreview.style.display === "none" ||
    certificatePreview.style.display === ""
  ) {
    certificatePreview.style.display = "block";
    courseText.classList.add("active");
  } else {
    certificatePreview.style.display = "none";
    courseText.classList.remove("active");
  }
}
