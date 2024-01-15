let addCourseBtn = document.getElementById('addCourseBtn');
let crnInputId = 1;
addCourseBtn.addEventListener('click', async()=> {
    createAddInput();
});

function createAddInput(){
    var id = crnInputId;
    crnInputId++;
    var inputBox = $('<input>').attr({
        type: 'text',
        id: 'crn_id' + id,
        name: 'crn' + id,
        placeholder: 'CRN'
    });
    $('#crnInputList').append(inputBox);
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
    for (let i =1; i<= 10; i++){
        chrome.storage.local.get('crn_id'+i,function(result) {
            console.log(result)
            crn=result['crn_id'+i]
            if (crn!=null){
                createAddInput();
                let crnInput = document.getElementById('crn_id'+i);
                crnInput.value = crn;
            }
            else return;
        });
    }
});