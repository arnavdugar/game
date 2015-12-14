function join(event) {
    var id = document.getElementById('gid').value;
    if(id) {
        location.href = id;
    }
}

function create(event) {
    location.href = 'new';
}
