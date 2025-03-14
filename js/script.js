document.addEventListener("DOMContentLoaded", function () {
    fetch("./data/courses.json") // Đọc dữ liệu từ file JSON
        .then(response => response.json())
        .then(data => {
            const coursesList = document.getElementById("courses-list");
            coursesList.innerHTML = ""; // Xóa nội dung cũ nếu có

            data.courses.forEach(course => {
                const courseItem = document.createElement("a");
                courseItem.href = `./courses.html?courseId=${course.id}`;
                courseItem.classList.add("course-item");

                courseItem.innerHTML = `
                    <p>${course.title}</p>
                    <span>${course.description}</span>
                `;

                coursesList.appendChild(courseItem);
            });
        })
        .catch(error => console.error("Lỗi tải khóa học:", error));
});