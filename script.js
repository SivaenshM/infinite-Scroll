const imgcontainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let picturesArray = [];
let imagesLoaded = 0;
let totalImages = 0;


const count = 20;
const apiKey = "fGatneYFFLzFQGd0qrLheW94gMtjEYc_QGsdNEFHlWg";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

//for DRY our code becaus ewe used Set attribute repaetely in our code

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }

}

//Function for Image Loading checking

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded == totalImages) {
        ready = true;
    }
}

//Function for creating images and links in DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = picturesArray.length;
    //using For each arry method 
    picturesArray.forEach((photo) => {
        //Create a Anchor element
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, { href: photo.links.html, target: '_blank' })

        //create a Image element
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.description);
        // img.setAttribute('title', photo.description);

        setAttributes(img, { src: photo.urls.regular, alt: photo.description, title: photo.description })
        //event listener for image loading
        img.addEventListener('load', imageLoaded);
        //To put image elment inside the anchor element
        item.appendChild(img);
        imgcontainer.appendChild(item);

        // `<a href="${photo.links.html}" ><img src="${photo.urls.regular}" alt="${photo.description}></a>`
        // console.log(picturesArray);
    })
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        picturesArray = await response.json();
        displayPhotos();

    } catch (error) {
        //error goes here
    }
}

//Assign a event lisenter to infinite loading effect

//calculating the loading instance using window object
//window.innerHeight--Height of browers window (const)
//window.scrollY -- (pixles scrolled from the top page to down distance)
//document.body.offetheight -- (pixels height the total page loaded at current instatnce)

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        loader.hidden = true;
        getPhotos();
    }
})

getPhotos();