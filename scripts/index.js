///this function is for get all catagories .
const loadCatagories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCatagory(data.data.news_category);
}

const displayCatagory = (catagories) => {
    const displayCatagory = document.getElementById('displayCatagory');
    for (const catagory of catagories) {
        const catagoryName = (catagory.category_name);
        const div = document.createElement('button');
        div.classList.add('hover:text-lime-700');
        div.classList.add('font-bold');
        div.classList.add('rounded-xl');
        div.classList.add('text-gray-700');
        div.innerHTML = `
           <button onclick="loadCategorysData('${catagory.category_id}')">${catagoryName}</button>
        `;
        displayCatagory.appendChild(div)
        // const button = document.createElement('button');
        // button.classList.add('hover:bg-gray-400')
        // button.classList.add('py-0')
        // button.classList.add('rounded-xl')
        // button.classList.add('px-0')
        // button.innerText = catagoryName;
        // displayCatagory.appendChild(button);

    }
};

const loadCategorysData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategorysNews(data.data);
}

const displayCategorysNews = (allNews) => {
    const newsPost = document.getElementById('newsPost');
    newsPost.innerHTML = '';
    allNews.forEach(sigleItem => {
        console.log(sigleItem);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${sigleItem.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="font-bold">${sigleItem.title}</h5>
                    <p class="text-alipsis pt-2">${sigleItem.details}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div>
        `;
        newsPost.appendChild(div);
    });
}
loadCatagories();