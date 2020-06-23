const calculate = (items, amount) => {
    const arrayNew = [];
    items.map(allProduct => {
        amount.items_ids.map(keyItem => {
            if (allProduct.item_id === keyItem) {
                arrayNew.push({
                    item_id: allProduct.item_id,
                    amount: allProduct.amount,
                });
            }
        })
    });

    const duplicate = [...new Set(arrayNew.map(({ item_id }) => item_id))].map(e => arrayNew.find(({ item_id }) => item_id == e));
    const filterAmount = duplicate.filter(key => key.amount < amount.amount);
    const item_ids = [];
    duplicate.filter(key => {
        if (key.amount < amount.amount) {
            item_ids.push(key.item_id);
        }
    });
    const total = filterAmount.reduce((a, { amount }) => a + amount, 0);

    return { total, item_ids };
}

module.exports = calculate;