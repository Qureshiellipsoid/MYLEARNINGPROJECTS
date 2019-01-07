function fillStates(data){
    let previousState = null
    $.each(data, function(index, item){
        if(item.state_id != previousState){
            $('#state').append($('<option>').text(item.state).val(item.state_id))
            previousState =  item.state_id
        }
    })
}


fillCities = (data, state_id) => {
    $('#city').empty();
    let filteredCities = data.filter((item) => {return item.state_id == state_id})
    filteredCities.forEach((item) => {
        $('#city').append($('<option>').text(item.name).val(item._id))
    })
}


$(document).ready(function(){
    let fetchedData = []
    let url = '/state_city/getAllStatesAndCities'
    $.getJSON(url, function(data){
        fetchedData = data
        fillStates(fetchedData)
    })
    $('#state').change((e) => {
        fillCities(fetchedData, e.target.value);
    })
    
})


// let url = '/state_city/getAllStates'
//     $.getJSON(url,function(data){
//         $.each(data, function(index, item){
//             $('#state').append($('<option>').text(item.name).val(item._id))
//         })
//     })
//     $('#state').change(function(e){
//         console.log(e.target.value);
//         state_id = e.target.value;
//         let url = '/state_city/getAllCities'
//         $.getJSON(url, {state_id : state_id}, function(data){
//             $('#city').empty();
//             for(let i = 0 ; i< data.length ; i++){
//                 $('#city').append($('<option>').text(data[i].name).val(data[i]._id))
//             }
//         })
//     })








