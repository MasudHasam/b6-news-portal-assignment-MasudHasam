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
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 840px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${sigleItem.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="font-bold">${sigleItem.title}</h5>
                    <p class="text-alipsis pt-2">${sigleItem.details}</p>

                  <div class="d-flex justify-content-between align-items-center mt-2 px-3">
                     <div class="d-flex align-items-center gap-2">
                        <div><img class="rounded-full" id="authorImg" src="${sigleItem.author.img}" alt=""></div>
                        <div>
                           <small class="font-semibold block text-gray-500">${sigleItem.author.name ? sigleItem.author.name : 'not found'}</small>
                           <smalll class="font-small text-gray-500">${sigleItem.author.published_date ? sigleItem.author.published_date.slice(0, 10) : 'not found'}</small>
                        </div>
                     </div>
                     <div class="d-flex gap-2 pt-3">
                           <div><i class="lni lni-eye"></i></div>
                           <div>
                              <small class="font-bold block">${sigleItem.total_view ? sigleItem.total_view : 'not found'}</small>
                           </div>
                     </div>
                     <div class="pt-3  text-4xl "><button onclick="detailsButton('${sigleItem._id}')"  data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="lni lni-arrow-right-circle"></i></button></div>
                 </div>
               </div>
            </div>
        </div>
        `;
        newsPost.appendChild(div);
    });
}


const detailsButton = async (itemId) => {
    const url = `https://openapi.programming-hero.com/api/news/${itemId}`;
    const res = await fetch(url);
    const data = await res.json();
    setModalDetails(data.data[0]);
};


const setModalDetails = (itemDetails) => {
    console.log(itemDetails.total_view);
}

loadCatagories();