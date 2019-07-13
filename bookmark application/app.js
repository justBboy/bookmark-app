document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookMark = {
        name : siteName,
        url : siteUrl
    }

    if(localStorage.getItem('bookmarks') === null){
        bookMarks = []
        bookMarks.push(bookMark);

        localStorage.setItem('bookmarks', JSON.stringify(bookMarks));
    }else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookMark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    addBookmark();

    document.getElementById('myForm').reset()

    e.preventDefault;
}

function deleteBookmark(url){
    var bookMarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0; i<bookMarks.length; i++){
        if(bookMarks[i].url == url){
            bookMarks.splice(i, 1)
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookMarks));
    addBookmark();
}

function addBookmark(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarkResult = document.getElementById('bookmarkResult');
    bookmarkResult.innerHTML = '';
    for(var bookMark of bookmarks){
        var name = bookMark.name;
        var url = bookMark.url;
        bookmarkResult.innerHTML += `<div class="well">
                        <h3>${name}</h3>
                        <a class="btn btn-default" target="_blank" href="${url}">Visit</a>
                        <a onclick="deleteBookmark('${url}')" class="btn btn-danger" href="#">Delete</a>
        </div>`
    }
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please enter a valid url');
        return false;
    }

    return true;
}