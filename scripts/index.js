///this function is for get all catagories .
const loadCatagories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCatagory(data.data.news_category);
    } catch (error) {
        console.log(error);
    }
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

    }
};

const loadCategorysData = async (id) => {

    const itemName = document.getElementById('itemName');
    switch (id) {
        case '01':
            itemName.innerText = 'Breaking News';
            break;
        case '02':
            itemName.innerText = 'Regular News';
            break;
        case '03':
            itemName.innerText = 'International News';
            break;
        case '04':
            itemName.innerText = 'Sports';
            break;
        case '05':
            itemName.innerText = 'Entertainment';
            break;
        case '06':
            itemName.innerText = 'Culture';
            break;
        case '07':
            itemName.innerText = 'Arts';
            break;
        case '08':
            itemName.innerText = 'All News';
            break;
    };

    const spiner = document.getElementById('spiner');
    spiner.classList.remove('d-none');
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategorysNews(data.data);
    } catch (error) {
        console.log(error);
    }

}

const displayCategorysNews = (allNews) => {

    const itemCount = document.getElementById('itemCount');
    itemCount.innerText = allNews.length;

    const removeItem = document.getElementById('errorMasage')
    if (allNews.length === 0) {
        removeItem.classList.remove('d-none');
    } else {
        removeItem.classList.add('d-none');
    }

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

    const spiner = document.getElementById('spiner');
    spiner.classList.add('d-none');
}


const detailsButton = async (itemId) => {
    const url = `https://openapi.programming-hero.com/api/news/${itemId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        setModalDetails(data.data[0]);
    } catch (error) {
        console.log(error);
    }
};


const setModalDetails = (itemDetails) => {
    const insideModal = document.getElementById('insideModal');
    insideModal.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="modal-content">
        <div class="modal-header bg-slate-800">
           <h5 class="modal-title text-white font-semibold" id="staticBackdropLabel">${itemDetails.title}</h5>
           <button type="button" class="btn-close bg-red-400" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
             <img class="w-11/12  mx-auto pb-2" src="${itemDetails.image_url}" class="img-fluid rounded-start" alt="...">
             <p>${itemDetails.details}</p>
             <img class="mt-3  rounded-full" id="modalAuthorImage" src="${itemDetails.author.img}" class="img-fluid rounded-start" alt="...">
             <p class="text-bold text-stone-500">Author: ${itemDetails.author.name ? itemDetails.author.name : 'not found'}</p>
             <p class="text-bold text-stone-500 ">Published_date: ${itemDetails.author.published_date ? itemDetails.author.published_date : 'not found'}</p>
             <p class="text-bold text-stone-500 ">Ratings: ${itemDetails.rating.number ? itemDetails.rating.number : 'not found'} 
                 <i class="lni lni-star-filled"></i><i class="lni lni-star-filled"></i><i class="lni lni-star-filled"></i><i class="lni lni-star-filled"></i><i class="lni lni-star-half"></i></p>
             
        </div>
        <div class="modal-footer">
           <button type="button" class="btn btn-primary bg-slate-700"
              data-bs-dismiss="modal">Close</button>
         </div>
    </div>
    `;
    insideModal.appendChild(div);
}

loadCategorysData(id = '01');
loadCatagories();