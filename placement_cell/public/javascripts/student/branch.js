

$(document).ready(function(){
    let url = '/branch/getBranch'
    $.getJSON(url, function(data){
        $.each(data, function(index, item){
            $('#branch_name').append($('<option>').text(item.branch_name).val(item._id))
        })
    })
    
})