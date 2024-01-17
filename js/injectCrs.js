$(document).ready(function() {
    var empty = false;
    for (let i =1; i<= 10; i++){
        let crn = chrome.storage.local.get('crn_id'+i,function(result) {
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
    }});

function dropCourse(){
    let dropCrs='12618';
    var tdWithInput = $('td:has(:input)').filter(function() {
        return $(this).find(':input').val() == dropCrs;
      });
    var previousTd = tdWithInput.prev();
    var selectBox = previousTd.find('select');
    selectBox.val("DW") //DW is the value for web drop
}