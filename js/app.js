var Myswiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: 1000,
    pagination: '.swiper-pagination',
    paginationClickable: true
});
function ajax(url) {
    return new Promise(function (resolve, reject) {
        var xhr = null;
        var handler = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.statusText));
            }
        }
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.open('get', url, true);
        xhr.send();
        xhr.onreadystatechange = handler;
    })
}
ajax('http://localhost:8080/log').then(function (result) {
    var data = JSON.parse(result);
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = `<i class="iconfont ${data[i].src}"></i>
                            <span>${data[i].text}</span>`;
        document.querySelector('.list').appendChild(li);
    }
}).catch(function (error) {
    console.log(error);
})
