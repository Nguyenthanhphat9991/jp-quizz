// Lấy courseId và lessonId từ URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("courseId");
const lessonId = urlParams.get("lessonId");

function loadResults() {
    const resultContainer = document.getElementById("result-container");
    const results = JSON.parse(localStorage.getItem("quizResults"));
    if (!results) {
        resultContainer.innerHTML = "<p>Không có dữ liệu kết quả</p>";
        return;
    }

    if (results.wrongCount === 0) {
        resultContainer.innerHTML += "<h3>🎉 Chúc mừng! Bạn đã trả lời đúng tất cả các câu hỏi! 🎉</h3>";
        document.getElementById("score").innerText =
            `Đúng: ${results.correctCount} | Sai: ${results.wrongCount}`;
    } else {
        resultContainer.innerHTML += "<h3>Các câu sai:</h3>";
        document.getElementById("score").innerText =
            `Đúng: ${results.correctCount} | Sai: ${results.wrongCount}`;

        const wrongList = document.getElementById("wrong-list");

        let row;
        results.wrongQuestions.forEach((q, index) => {

            if (index % 2 === 0) {
                row = document.createElement("div");
                row.classList.add("row", "g-3");
                wrongList.appendChild(row);
            }

            // Tạo cột Bootstrap
            const col = document.createElement("div");
            col.classList.add("col-md-6"); // Mỗi hàng có 2 cột
            col.innerHTML = `
                <div class="card border-danger wrong-item">
                    <div class="card-body wrong-item">
                        <p class="card-title"><strong>Câu ${q.number}:</strong> ${q.text}</p>
                        <p class="card-text"><strong>Đáp án đúng:</strong> ${q.correct}</p>
                    </div>
                </div>
            `;

            row.appendChild(col);
        });
    }
}

function retryQuiz() {
    // Xóa kết quả cũ
    localStorage.removeItem("quizResults");

    // Chuyển về trang quiz với đúng courseId & lessonId
    window.location.href = `quiz.html?courseId=${courseId}&lessonId=${lessonId}`;
}

loadResults();