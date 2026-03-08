let orders = [];
let nextOrderId = 1001;

const getAll = () => orders;
const add = (order) => {
  const newOrder = {
    ...order,
    id: `ORD-${nextOrderId++}`,
    status: "Pending",
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  return newOrder;
};
const updateStatus = (id, status) => {
  const order = orders.find(o => o.id === id);
  if (!order) return null;
  order.status = status;
  return order;
};

module.exports = { getAll, add, updateStatus };
