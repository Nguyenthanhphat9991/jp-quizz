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
                <i class="fa fa-book"></i> <a href="./index.html">Khóa học</a><span>/</span><a href="./courses.html?courseId=${course.id}"> ${course.title}</a>
            `;

            course.categorys.forEach(category => {
                const categoryCol = document.createElement("div");
                categoryCol.classList.add("col-md-3", "mb-4");

                categoryCol.innerHTML = `
                    <div class="lesson-card">
                        <p>${category.title}</p>
                        <span>${category.description}</span>
                    </div>
                `;

                categoryCol.addEventListener("click", () => {
                    window.location.href = `category.html?courseId=${courseId}&categoryId=${category.id}`;
                });

                courseContainer.appendChild(categoryCol);
            });
        })
        .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
});