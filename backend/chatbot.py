# chatbot.py
import pandas as pd

# Load datasets
products = pd.read_csv('data/products.csv')
orders = pd.read_csv('data/orders.csv')
order_items = pd.read_csv('data/order_items.csv')
inventory = pd.read_csv('data/inventory_items.csv')

def get_response(message):
    message = message.lower()

    # Top 5 most sold products
    if "top" in message and "products" in message:
        top_products = order_items['product_id'].value_counts().head(5)
        result = []
        for pid in top_products.index:
            name = products.loc[products['id'] == pid, 'name'].values
            if len(name) > 0:
                result.append(name[0])
        return f"Top 5 sold products:\n" + "\n".join(result)

    # Order status (mocked)
    elif "status" in message and "order" in message:
        order_id = ''.join(filter(str.isdigit, message))
        if order_id and int(order_id) in orders['order_id'].values:
            status = orders.loc[orders['order_id'] == int(order_id), 'status'].values[0]
            return f"The status of order ID {order_id} is: {status}"
        else:
            return "Order ID not found."

    # Stock left of a product
    elif "stock" in message or "left" in message:
        for name in products['name'].unique():
            if name.lower() in message:
                product_id = products.loc[products['name'].str.lower() == name.lower(), 'id'].values[0]
                total = inventory[inventory['product_id'] == product_id]
                available = total['sold_at'].isna().sum()
                return f"{available} units of '{name}' are in stock."
        return "Product not found."

    return "Sorry, I didn't understand that. Can you rephrase?"
