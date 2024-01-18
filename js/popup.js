let addCourseBtn = document.getElementById('addCourseBtn');
let crnInputId = 1;
addCourseBtn.addEventListener('click', async()=> {
    createAddInput();
});
var dropList = [];
function createAddInput(){
    if (crnInputId > 10) {
        alert('You can only add 10 courses');
        return;
    }
    var id = crnInputId;
    crnInputId++;
    var lastValidInput = '';
    var inputBox = $('<input>').attr({
        type: 'text',
        id: 'crn_id' + id,
        name: 'crn' + id,
        placeholder: 'CRN',
        class: 'form-control',
    }).on('blur', function() {
        var input = $(this).val();
        if (isNaN(input) || input.length !== 5) {
            $(this).val(lastValidInput);
        } else {
            lastValidInput = input;
        }
    });;
    var removeBtn = $('<button>').attr({
        id: 'removeBtn' + id,
        name: 'removeBtn' + id,
        class: 'btn btn-outline-secondary'
    }).text('Remove').click(function() {
        $(this).parent().remove();
        updateIds(id);
        updateChromeStorage();
    });
    var inputGroup = $('<div>').attr({
        class: 'input-group mb-3',
        id: 'inputGroup' + id
    });
    inputGroup.append(inputBox, removeBtn);
    $('#crnInputList').append(inputGroup);
}

function updateIds(id) {
    $('#crnInputList .input-group').each(function(index, inputGroup) {
        var currentId = parseInt($(inputGroup).attr('id').replace('inputGroup', ''));
        if (currentId > id) {
            $(inputGroup).attr('id', 'inputGroup' + (currentId - 1));
            $(inputGroup).find('input').attr({
                id: 'crn_id' + (currentId - 1),
                name: 'crn' + (currentId - 1)
            });
            $(inputGroup).find('button').attr({
                id: 'removeBtn' + (currentId - 1),
                name: 'removeBtn' + (currentId - 1)
            });
        }
    });
    crnInputId--;
}
function updateChromeStorage(){
    chrome.storage.local.clear();
    $('#crnInputList .input-group').each(function(index, inputGroup) {
        var currentId = parseInt($(inputGroup).attr('id').replace('inputGroup', ''));
        var crn = $(inputGroup).find('input').val();
        var obj = {};
        obj['crn_id'+currentId] = crn;
        chrome.storage.local.set(obj);
    });
}
function saveDropList(){  
    let dropList = getTagList();
    chrome.storage.local.set({'dropList': dropList});
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
    empty = false;
    for (let i =1; i<= 10; i++){
        chrome.storage.local.get('crn_id'+i,function(result) {
            console.log(result)
            crn=result['crn_id'+i]
            if (crn!=null){
                createAddInput();
                let crnInput = document.getElementById('crn_id'+i);
                crnInput.value = crn;
            }
            else {
                empty=true;
                return
            };
        });
        if (empty){
            break;
        }
    }
    chrome.storage.local.get(['dropList'], function(result) {
        console.log('Value currently is ' + result.dropList);
        dropList = result.dropList;
        console.log(dropList);
        loadTagList(dropList);
    });
    
});