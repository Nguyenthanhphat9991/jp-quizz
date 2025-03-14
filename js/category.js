document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("courseId");
    const categoryId = urlParams.get("categoryId"); // Nên đồng nhất: categoryId

    if (categoryId == 2) {
        window.location.href = `quiz.html?categoryId=${categoryId}`;
        return;
    }

    fetch('./data/courses.json')
        .then(response => response.json())
        .then(data => {
            const categoryContainer = document.getElementById("category-container");
            const breadcrumb = document.querySelector(".breadcrumb");

            // Tìm khóa học theo courseId
            const course = data.courses.find(c => c.id == courseId);
            if (!course) {
                breadcrumb.innerHTML = `<p style="color: red;">Khóa học không tồn tại!</p>`;
                return;
            }

            // Tìm danh mục (category) theo categoryId
            const category = course.categorys.find(cat => cat.id == categoryId);
            if (!category) {
                breadcrumb.innerHTML = `<p style="color: red;">Danh mục không tồn tại!</p>`;
                return;
            }

            // Cập nhật breadcrumb
            breadcrumb.innerHTML = `
                <i class="fa fa-book"></i> <a href="./index.html">Khóa học</a> <span>/</span> 
                <a href="category.html?courseId=${courseId}">${course.title}</a> <span>/</span> 
                <a href="#">${category.title}</a>
            `;

            // Kiểm tra lessons có tồn tại không
            if (!category.lessons || category.lessons.length === 0) {
                categoryContainer.innerHTML = `<p style="color: red;">Không có bài học nào!</p>`;
                return;
            }

            // Duyệt danh sách lessons để hiển thị
            category.lessons.forEach(lesson => {
                const lessonCol = document.createElement("div");
                lessonCol.classList.add("col-md-3", "mb-4");

                lessonCol.innerHTML = `
                    <div class="lesson-card">
                        <p>${lesson.title}</p>
                    </div>
                `;

                lessonCol.addEventListener("click", () => {
                    window.location.href = `quiz.html?courseId=${courseId}&categoryId=${categoryId}&lessonId=${lesson.id}`;
                });

                categoryContainer.appendChild(lessonCol);
            });
        })
        .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
});
