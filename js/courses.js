document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("courseId");

    fetch('./data/courses.json')
        .then(response => response.json())
        .then(data => {
            const courseContainer = document.getElementById("course-container");
            const breadcrumb = document.querySelector(".breadcrumb");

            // Tìm khóa học theo courseId
            const course = data.courses.find(c => c.id == courseId);

            if (!course) {
                breadcrumb.innerHTML = `<p style="color: red;">Khóa học không tồn tại!</p>`;
                return;
            }

            // Cập nhật breadcrumb với course.title
            breadcrumb.innerHTML = `
                <i class="fa fa-book"></i> <a href="./index.html">Khóa học</a><span>/</span><a href="#"> ${course.title}</a>
            `;

            course.lessons.forEach(lesson => {
                const lessonCol = document.createElement("div");
                lessonCol.classList.add("col-md-3", "mb-4");

                lessonCol.innerHTML = `
                    <div class="lesson-card">
                        <p>${lesson.title}</p>
                    </div>
                `;

                lessonCol.addEventListener("click", () => {
                    window.location.href = `quiz.html?courseId=${courseId}&lessonId=${lesson.id}`;
                });

                courseContainer.appendChild(lessonCol);
            });
        })
        .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
});