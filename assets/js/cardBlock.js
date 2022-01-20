const cardBlock = (card_class, order_no) => `
<div class="col s4" id="nr_order_${order_no}" >
    <div class="card ${card_class}">
            <div class="card-content white-text">
            <h2 class="center">${order_no}</h2>
        </div>
    </div>
</div>
`
module.exports ={
    cardBlock
}