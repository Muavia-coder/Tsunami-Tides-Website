window.onload = function() {
    // DOM elements for Section Navigation
    const circlesContainer = document.getElementById('circles-container');
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.dot');
    const nextButton = document.getElementById('next-button');
    const coverPage = document.getElementById('cover');
    let currentSectionIndex = 0;

    // DOM elements for Quiz
    const questions = document.querySelectorAll('.question');
    const answerButtons = document.querySelectorAll('.answer');
    const quizStatus = document.getElementById('quiz-status');
    const scoreDisplay = document.getElementById('score-display');
    let currentQuestionIndex = 0;
    let score = 0;  // Initialize score

    // Function to generate floating circles
    // function createCircle() {
    //     const circle = document.createElement('div');
    //     circle.classList.add('circle');
    //     const size = Math.random() * 50 + 10; // Random size between 10 and 60
    //     circle.style.width = `${size}px`;
    //     circle.style.height = `${size}px`;
    //     circle.style.left = `${Math.random() * 100}vw`;
    //     circle.style.animationDuration = `${Math.random() * 10 + 5}s`;
    //     circlesContainer.appendChild(circle);
    //     circle.addEventListener('animationend', () => circle.remove());
    // }
    // setInterval(createCircle, 1000);

    // Function to display a section and update the active dot
    function showSection(index) {
        sections.forEach(section => section.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));
        const sectionToShow = sections[index];
        sectionToShow.style.display = 'block';
        dots[index].classList.add('active');
    }

    // Show cover page and wait for user interaction
    nextButton.addEventListener('click', () => {
        coverPage.style.display = 'none';
        showSection(currentSectionIndex);
    });

    // Navigate to the next section when the "Next" button inside section is clicked
    document.querySelectorAll('.next-section').forEach(button => {
        button.addEventListener('click', () => {
            currentSectionIndex = (currentSectionIndex + 1) % sections.length;
            showSection(currentSectionIndex);
        });
    });

    // Function to handle dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSectionIndex = index;
            showSection(index);
        });
    });

    // Initial setup: only cover page is displayed initially, and all sections are hidden
    sections.forEach(section => section.style.display = 'none');
    
    // Set up the scene, camera, and renderer for the wave animation
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('waveCanvas'), antialias: true });
    renderer.setSize(window.innerWidth * 0.8, 300);
    renderer.setClearColor(0x000000, 0);

    // Create wave geometry and material
    const geometry = new THREE.PlaneGeometry(10, 5, 30, 30);
    const material = new THREE.MeshBasicMaterial({ color: 0x0077be, wireframe: false });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2.5;
    scene.add(plane);

    // Set camera position
    camera.position.z = 5;

    // Transverse wave animation
    function animateWaves() {
        requestAnimationFrame(animateWaves);
        const position = geometry.attributes.position;
        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            position.setZ(i, Math.sin(x * 2 + Date.now() * 0.002) * 0.5);  // Oscillate along Z-axis
        }
        position.needsUpdate = true;
        renderer.render(scene, camera);
    }
    animateWaves();

    // Quiz Functionality
    function hideAllQuestions() {
        questions.forEach(question => {
            question.style.display = 'none';
        });
    }

    // Function to show the current question
    function showQuestion(index) {
        hideAllQuestions();
        if (index < questions.length) {
            questions[index].style.display = 'block';
        }
    }

    // Initialize by showing the first question
    showQuestion(currentQuestionIndex);

    // Handle answer selection and navigate to the next question
    answerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextQuestion = button.getAttribute('data-next');
            const isCorrect = button.classList.contains('correct'); // Assuming 'correct' class marks the correct answers

            // Update score if the answer is correct
            if (isCorrect) {
                score++;
            }

            if (nextQuestion === 'finished') {
                quizStatus.innerHTML = '<h3>Quiz Finished!</h3>';
                hideAllQuestions();
                // Show score for 3-5 seconds
                scoreDisplay.innerHTML = `Your Score: ${score} / ${questions.length}`;
                scoreDisplay.style.display = 'block';
                setTimeout(() => {
                    scoreDisplay.style.display = 'none';
                }, 3000); // Hide the score after 3 seconds
            } else {
                currentQuestionIndex = parseInt(nextQuestion.replace('question', '')) - 1;
                showQuestion(currentQuestionIndex);
            }
        });
    });

    // Function for showing content when navigating between sections
    document.getElementById('home-link').addEventListener('click', function() {
        showContent('home');
    });

    document.getElementById('community-link').addEventListener('click', function() {
        showContent('community');
    });

    document.getElementById('education-link').addEventListener('click', function() {
        showContent('education');
    });

    function showContent(type) {
        const sections = ['home', 'community', 'education'];
        sections.forEach(section => {
            document.getElementById(`${section}-content`).style.display = section === type ? 'block' : 'none';
            document.getElementById(`${section}-link`).classList.toggle('active', section === type);
        });
    }
};





document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('#simulation');
    const textElements = section.querySelectorAll('h2, p, ul');
    const nextButton = section.querySelector('.next-section');

    // Set up an IntersectionObserver to detect when the section is in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animation on the text when the section is visible
                textElements.forEach((element, index) => {
                    element.style.animationDelay = `${index * 0.2}s`; // Stagger animation
                    element.style.animationPlayState = 'running'; // Start animation
                });
                observer.unobserve(entry.target); // Stop observing after animation starts
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    observer.observe(section); // Start observing the section

    // Button click behavior
    nextButton.addEventListener('click', function() {
        // You can add logic here to go to the next section
        console.log('Next button clicked!');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Handle the See Answers button click event
    const seeAnswersBtn = document.getElementById('see-answers-btn');
    const answersSection = document.getElementById('answers-section');

    seeAnswersBtn.addEventListener('click', function() {
        // Toggle visibility of the answers section
        answersSection.style.display = answersSection.style.display === 'none' ? 'block' : 'none';
    });
});



