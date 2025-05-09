const canvas = document.getElementById('circleCanvas');
    const ctx = canvas.getContext('2d');
    let circles = [];
    let selectedCircle = null;
    let isDragging = false;

    function drawCircles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = circle === selectedCircle ? 'red' : 'blue';
            ctx.fill();
            ctx.closePath();
        });
    }

    function getCircleAt(x, y) {
        return circles.find(circle => {
            const dx = circle.x - x;
            const dy = circle.y - y;
            return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
        });
    }

    canvas.addEventListener('mousedown', function (e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickedCircle = getCircleAt(x, y);

        if (clickedCircle) {
            selectedCircle = clickedCircle;
            isDragging = true;
        } else {
            selectedCircle = null;
            circles.push({ x, y, radius: 20 });
        }
        drawCircles();
    });

    canvas.addEventListener('mousemove', function (e) {
        if (isDragging && selectedCircle) {
            const rect = canvas.getBoundingClientRect();
            selectedCircle.x = e.clientX - rect.left;
            selectedCircle.y = e.clientY - rect.top;
            drawCircles();
        }
    });

    canvas.addEventListener('mouseup', function () {
        isDragging = false;
    });

    canvas.addEventListener('wheel', function (e) {
        if (selectedCircle) {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 1 : -1;
            selectedCircle.radius = Math.max(5, selectedCircle.radius + delta);
            drawCircles();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Delete' && selectedCircle) {
            circles = circles.filter(circle => circle !== selectedCircle);
            selectedCircle = null;
            drawCircles();
        }
    });