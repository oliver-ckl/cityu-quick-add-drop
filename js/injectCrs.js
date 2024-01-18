$(document).ready(function() {
    var empty = false;
    for (let i =1; i<= 10; i++){
        let crn;
        chrome.storage.local.get('crn_id'+i,function(result) {
            console.log(result)
            crn=result['crn_id'+i]
            if (crn!=null){
                let crnFill = document.getElementById('crn_id'+i);
                crnFill.value = crn;
            }
            else {
                empty = true;
                return;
            }
        });
        if (empty)
            break;
    }
    dropCourse();
});

function dropCourse(){
    let dropList;
    chrome.storage.local.get("dropList", function(result) {
        dropList = result.dropList;
        console.log(dropList);
        dropList.forEach(dropCrs => {
            var tdWithInput = $('td').filter(function() {
                return $(this).text().includes(dropCrs);
              });
            var selectBox = tdWithInput.prev().find('select');
            selectBox.val("DW") //DW is the value for web drop
        });
    });
    
}