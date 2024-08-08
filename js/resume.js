document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchData("../jsons/my-info.json");
    document.getElementById("profile-picture").src = data.profilePicture;
    document.getElementById("name").textContent = data.name;
    document.getElementById("about").textContent = data.about;
    document.getElementById("location").textContent = data.location;
    document.getElementById("university").textContent = data.university;
    document.getElementById("email").href = `mailto:${data.email}`;
    document.getElementById("googleScholar").href =
      data.socialLinks.googleScholar;
    document.getElementById("instagram").href = data.socialLinks.instagram;
    document.getElementById("linkedin").href = data.socialLinks.linkedin;
    document.getElementById("twitter").href = data.socialLinks.twitter;
    document.getElementById("github").href = data.socialLinks.github;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  try {
    const data = await fetchData("../jsons/resume.json");
    const resumeSection = document.getElementById("resume");
    resumeSection.innerHTML += `
          <p>${data.bio}</p>
          <h3>Eğitim</h3>
          <ul>
            ${data.education
              .map(
                (edu) => `
                  <li>
                    ${edu.degree} - <i>${edu.institution}</i>
                    ${
                      edu.startYear
                        ? `<span class="date-info">(Başlangıç Tarihi: ${
                            edu.startYear
                          } - ${
                            edu.endYear
                              ? "Bitiş Tarihi: " + edu.endYear
                              : "Devam Ediyor"
                          })</span>`
                        : ""
                    }
                    ${
                      edu.skills
                        ? `<span class="skills-info">Kazandırdığı Yetenekler: ${edu.skills.join(
                            ", "
                          )}</span>`
                        : ""
                    }
                  </li>`
              )
              .join("")}
          </ul>
          <h3>İş Deneyimi</h3>
          <ul>
            ${data.workExperience
              .map(
                (job) => `
                  <li>
                    ${job.position} - <i>${job.company}</i>
                    ${
                      job.startDate
                        ? `<span class="date-info">(Başlangıç Tarihi: ${
                            job.startDate
                          } - ${job.endDate || "Devam Ediyor"})</span>`
                        : ""
                    }
                    ${
                      job.skills
                        ? `<span class="skills-info">Kazandırdığı Yetenekler: ${job.skills.join(
                            ", "
                          )}</span>`
                        : ""
                    }
                  </li>`
              )
              .join("")}
          </ul>
          <h3>Yeteneklerim</h3>
          <div class="skills-section">
            <div class="skills-column">
              <h4>Yazılım Dilleri</h4>
              <ul>
                ${data.skills["Yazılım Dilleri"]
                  .map(
                    (skill) => `
                      <li>
                        ${skill.name}
                        <div class="skill-bar-container">
                          <div class="skill-bar">
                            <div class="skill-bar-inner" style="width: ${skill.level}%;">${skill.level}%</div>
                          </div>
                        </div>
                      </li>`
                  )
                  .join("")}
              </ul>
            </div>
            <div class="skills-column">
              <h4>Programlar</h4>
              <ul>
                ${data.skills.Programlar.map(
                  (skill) => `
                      <li>
                        ${skill.name}
                        <div class="skill-bar-container">
                          <div class="skill-bar">
                            <div class="skill-bar-inner" style="width: ${skill.level}%;">${skill.level}%</div>
                          </div>
                        </div>
                      </li>`
                ).join("")}
              </ul>
            </div>
            <div class="skills-column">
              <h4>Diğer Yetenekler</h4>
              <ul>
                ${data.skills["Diğer Yetenekler"]
                  .map(
                    (skill) => `
                      <li>
                        ${skill.name}
                        <div class="skill-bar-container">
                          <div class="skill-bar">
                            <div class="skill-bar-inner" style="width: ${skill.level}%;">${skill.level}%</div>
                          </div>
                        </div>
                      </li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        `;

    try {
      const coursesData = await fetchData("../jsons/courses.json");
      const completedCoursesList = document.createElement("ul");
      completedCoursesList.id = "completedCoursesResume";
      completedCoursesList.innerHTML = coursesData.completedCourses
        .map(
          (course) => `
              <li>
                ${course.name} - <i>${course.platform}</i>
              </li>`
        )
        .join("");
      const resumeSection = document.getElementById("resume");
      resumeSection.innerHTML += `
          <h3>Tamamlanan Kurslar</h3>
          `;
      resumeSection.appendChild(completedCoursesList);
    } catch (coursesError) {
      console.error("Error fetching courses data:", coursesError);
    }
  } catch (error) {
    console.error("Error fetching resume data:", error);
  }
});
