function updateOnlineStatus() {
    status = navigator.onLine ? 'online' : 'offline';
    // $('#connectionStatus').html(status);
    return status
}


module.exports ={
    updateOnlineStatus,
}