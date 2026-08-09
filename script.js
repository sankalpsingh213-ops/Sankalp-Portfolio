function toggleMenu() {
    const menu = document.getElementById("nav-menu");
    menu.classList.toggle("active");
}

const githubUsername = "sankalpsingh213-ops";

async function loadGitHubProjects() {

    const container = document.getElementById("github-container");

    try {

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`
        );

        if (!response.ok) {
            throw new Error("Unable to load GitHub projects");
        }

        const projects = await response.json();

        container.innerHTML = "";

        if (projects.length === 0) {
            container.innerHTML = "<p>No public projects found.</p>";
            return;
        }

        projects.forEach(project => {

            const card = document.createElement("div");

            card.className = "project";

            card.innerHTML = `
                <div class="project-icon">🐙</div>

                <h3>${project.name}</h3>

                <p>
                    ${project.description || "GitHub project"}
                </p>

                <span>
                    ${project.language || "Programming"}
                </span>

                <br><br>

                <a 
                    href="${project.html_url}" 
                    target="_blank"
                    class="btn"
                >
                    View on GitHub
                </a>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        container.innerHTML =
            "<p>Unable to load GitHub projects right now.</p>";

        console.error(error);
    }
}

loadGitHubProjects();