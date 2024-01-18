var errorList = [];
var dropList = [];
var addList = [];
//the function treat Capital and small letters as the same
$.expr.pseudos.contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

$(document).ready(function() {
    $('#drop-area ul.tags').on('click', function() {
        $('#search-field-drop').focus();
    });
    $('#add-area ul.tags').on('click', function() {
        $('#search-field-add').focus();
    });
    $('#search-field-drop').on('keypress', function(event) {
        if (event.key == 'Enter') {
            createNewTag($(this),'drop');
        }
    });

    $('#search-field-add').on('keypress', function(event) {
        if (event.key == 'Enter') {
            createNewTag($(this),'add');
        }
    });
});
function loadList(inputList,listType){
    generateTagHtml(inputList,listType);
}  
function createNewTag(tag, listType){
    console.log('createNewTag started, '+listType);
    let $this = $(tag); 
    inputList = [];
    inputList = $this.val().trim().split(/[\s,-]+/);
    console.log("input list: "+inputList);
    errorList = [];
    generateTagHtml(inputList, listType);
    console.log('generateTagHtml finished');
    $this.val('');
    console.log('input cleared');
    saveList(listType);    
    console.log('createNewTag finished');
}
function generateTagHtml(list, listType){
    list.forEach(tag => {
        if (validate(tag,listType)) {
            let listItem = $('<li>', { class: 'addedTag p-1 m-1 d-flex justify-content-center align-items-center rounded-3' }).text(tag); 
            let closeButton = createCloseButton();
            closeButton.click(function() {  
                if(listType == 'drop'){
                    dropList = dropList.filter(function(value, index, arr){ return value != tag;});
                    saveList('drop');
                } else if(listType == 'add'){
                    addList = addList.filter(function(value, index, arr){ return value != tag;});
                    saveList('add');
                }
            })
            let hiddenInput = $('<input>', { type: 'hidden', value: tag, name: 'tags[]' });
            if(listType == 'drop'){
                listItem.append(closeButton, hiddenInput).insertBefore('.tags #drop-list');
                dropList.push(tag);
            } else {
                listItem.append(closeButton, hiddenInput).insertBefore('.tags #add-list');
                addList.push(tag);
            }
            
        } else {
            console.log("something wrong in this tag: " + tag + " , please check your input"); 
            errorList.push(tag);        
        }
    });
    if (errorList.length > 0) {
        attachAlertMessage(listType);
    }
}

function getdropList(){
    return dropList;
}
function getaddList(){
    return addList;
}

function attachAlertMessage(listType){
    // Remove the last alert message
    $('#tagContainer .alert').remove();
    // Create the alert message
    let alertMessage = document.createElement("div");
    alertMessage.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show", "m-3");
    alertMessage.setAttribute("role", "alert");
    alertMessage.innerHTML = "The following tag are not allowed: "+ errorList+" please check the input rules!";
    $(alertMessage).append(createCloseButton());
    if (listType == 'drop'){
        $('#dropContainer').append(alertMessage);
    }
    else{
        $('#addContainer').append(alertMessage);
    }  
}

function createCloseButton(){
    return $('<button>', { class: 'btn-close' }).click(function() { $(this).parent().remove(); });
}