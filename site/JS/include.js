document.addEventListener("DOMContentLoaded", async () => {

    // HEAD
    const headInclude = document.querySelector("[data-include-head]");
    if (headInclude) {
        const response = await fetch(headInclude.getAttribute("data-include-head"));
        const content = await response.text();
        document.head.insertAdjacentHTML("beforeend", content);
    }

    // BODY (header, etc)
    const includes = document.querySelectorAll("[data-include]");
    for (const el of includes) {
        const response = await fetch(el.getAttribute("data-include"));
        const content = await response.text();
        el.innerHTML = content;
    }

});