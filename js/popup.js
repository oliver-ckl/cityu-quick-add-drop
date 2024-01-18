let addCourseBtn = document.getElementById('addCourseBtn');
let crnInputId = 1;

function saveList(listType){  
    if (listType == 'add'){
        chrome.storage.local.set({'addList': getaddList()});
    } else {
        chrome.storage.local.set({'dropList': getdropList()});
    }
    
}
$(document).on('input', '#crnInputList input', function() {
    var inputId = $(this).attr('id');
    var inputVal = $(this).val();
    var obj = {};
    obj[inputId] = inputVal;
    chrome.storage.local.set(obj);
    console.log(obj);
});

$(document).ready(function() {    
    chrome.storage.local.get(['dropList'], function(result) {
        console.log('Drop list Value currently is ' + result.dropList);
        if(result.dropList.length > 0)
            loadList(result.dropList,'drop');
    });
    chrome.storage.local.get(['addList'], function(result) {
        console.log('Add List Value currently is ' + result.addList);
        if (result.addList.length > 0)
            loadList(result.addList,'add');
    });
});