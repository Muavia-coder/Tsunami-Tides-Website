document.addEventListener("DOMContentLoaded", () => {
    let currentSectionIndex = 0;
    const sections = document.querySelectorAll(".section");
    const nextButtons = document.querySelectorAll(".next-section");

    // Function to show a section with the bottom-to-top effect
    function showSection(index) {
        sections.forEach((section, idx) => {
            section.classList.remove("active", "exit");
            if (idx === index) {
                section.classList.add("active");
            } else if (idx === index - 1) {
                section.classList.add("exit");
            }
        });
    }

    // Add event listeners to "Next" buttons
    nextButtons.forEach((button, idx) => {
        button.addEventListener("click", () => {
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                showSection(currentSectionIndex);
            }
        });
    });

    // Initialize the first section as active
    showSection(currentSectionIndex);
});
