// TEMPLATE FUNCTIONS

const addPostTitles = (posts, container) => {
    const template = document.querySelector('#post-title-template');
    posts.forEach((post) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.post-title').dataset.postId = post.id;
        clone.querySelector('.post-title .title').textContent = post.title;
        clone.querySelector('.post-title p').textContent = post.created_at;
        container.appendChild(clone);
    });
}

const showPostContent = (post, container) => {
    const template = document.querySelector('#post-content-template');
    const clone = template.content.cloneNode(true);
    const rawHtml = marked.parse(post.content_md);

    const temp = document.createElement('div');
    temp.innerHTML = DOMPurify.sanitize(rawHtml);

    const asideTemplate = document.querySelector('#aside-template');
    temp.querySelectorAll('span.aside').forEach(span => {
        const clone = asideTemplate.content.cloneNode(true);
        clone.querySelector('aside').innerHTML = span.innerHTML;

        let blockEl = span.parentElement;
        while (blockEl.parentElement !== null && blockEl.parentElement !== temp) {
            blockEl = blockEl.parentElement;
        }
        temp.insertBefore(clone, blockEl);
        span.remove();
    });

    clone.querySelector('.post-content-body').innerHTML = temp.innerHTML;
    container.innerHTML = '';
    container.appendChild(clone);
}


// WEATHER WIDGET

const weatherCodeToEmoji = (code) => {
    if (code === 0)            return '☀️';
    if (code <= 2)             return '⛅';
    if (code === 3)            return '☁️';
    if (code <= 48)            return '🌫️';
    if (code <= 55)            return '🌦️';
    if (code <= 65)            return '🌧️';
    if (code <= 77)            return '🌨️';
    if (code <= 82)            return '🌧️';
    if (code <= 86)            return '🌨️';
    return '⛈️';
};

const initWeather = async () => {
    const iconEl  = document.getElementById('weather-icon');
    const tempEl  = document.getElementById('weather-temp');
    const timeEl  = document.getElementById('weather-time');

    const updateTime = () => {
        timeEl.textContent = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/Los_Angeles'
        }).format(new Date());
    };

    const fetchWeather = async () => {
        try {
            const res = await fetch(
                'https://api.open-meteo.com/v1/forecast' +
                '?latitude=45.5231&longitude=-122.6765' +
                '&current=temperature_2m,weather_code' +
                '&temperature_unit=fahrenheit' +
                '&timezone=America%2FLos_Angeles'
            );
            const data = await res.json();
            iconEl.textContent = weatherCodeToEmoji(data.current.weather_code);
            tempEl.textContent = `${Math.round(data.current.temperature_2m)}°F`;
        } catch (e) {
            iconEl.textContent = '?';
            tempEl.textContent = '';
        }
    };

    updateTime();
    setInterval(updateTime, 60000);
    fetchWeather();
    setInterval(fetchWeather, 30 * 60 * 1000);
};


// INIT

document.addEventListener("DOMContentLoaded", () => {
    initApp();
}, { once: true });

const initApp = async () => {
    const menuCol = document.getElementById("header-col2");
    const menuList = menuCol.querySelector("ul");
    const contentNav = document.getElementById("content-nav");
    const contentEl = document.getElementById("content");
    const contentContent = document.getElementById("content-content");
    const postContentArea = document.getElementById("post-content-area");

    let posts;
    try {
        const response = await fetch('posts.json');
        posts = await response.json();
    } catch (err) {
        postContentArea.textContent = 'Failed to load posts. Please try again later.';
        return;
    }

    menuCol.addEventListener("click", (e) => {
        menuList.classList.toggle("show");
        e.stopPropagation();
    });

    document.addEventListener("click", () => {
        menuList.classList.remove("show");
    });

    // Font size toggle
    const fontSizeSm = document.querySelector('#font-size-control .font-size-sm');
    const fontSizeLg = document.querySelector('#font-size-control .font-size-lg');
    fontSizeSm.classList.add('current');

    fontSizeSm.addEventListener('click', () => {
        contentContent.classList.remove('font-lg');
        fontSizeSm.classList.add('current');
        fontSizeLg.classList.remove('current');
    });

    fontSizeLg.addEventListener('click', () => {
        contentContent.classList.add('font-lg');
        fontSizeLg.classList.add('current');
        fontSizeSm.classList.remove('current');
    });

    // About modal
    const aboutModal = document.getElementById('about-modal');

    document.getElementById('about-menu-item').addEventListener('click', () => {
        menuList.classList.remove('show');
        aboutModal.showModal();
    });

    document.getElementById('about-modal-ok').addEventListener('click', () => {
        aboutModal.close();
    });

    aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) aboutModal.close();
    });

    // Weather widget
    initWeather();

    // Add post "titles" to nav
    addPostTitles(posts, contentNav);

    // Show post content on title click
    contentNav.addEventListener("click", (e) => {
        const link = e.target.closest(".post-title a");
        if (!link) return;
        e.preventDefault();
        contentNav.querySelectorAll(".post-title a.current").forEach(el => el.classList.remove("current"));
        link.classList.add("current");
        const postId = parseInt(link.closest(".post-title").dataset.postId);
        const post = posts.find(p => p.id === postId);
        if (post) {
            showPostContent(post, postContentArea);
            contentContent.classList.add('loaded');
            contentEl.classList.add('loaded');
        }
    });
}
