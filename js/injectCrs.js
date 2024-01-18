$(document).ready(function() {
    addCourse();
    dropCourse();
});

function dropCourse(){
    let dropList;
    chrome.storage.local.get("dropList", function(result) {
        dropList = result.dropList;
        dropList.forEach(dropCrs => {
            var tdWithInput = $('td').filter(function() {
                return $(this).text().includes(dropCrs);
              });
            var selectBox = tdWithInput.prev().find('select');
            selectBox.val("DW") //DW is the value for web drop
        });
    });
}

function addCourse(){
    let addList;
    chrome.storage.local.get("addList", function(result) {
        id=1;
        result.addList.forEach(addCrs => {
            $('#crn_id'+id).val(addCrs);
            console.log(addCrs);
            id++;
        });
    });
}