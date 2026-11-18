<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../store/cart.js'

const { items, itemCount, totalPrice, setQuantity, removeFromCart, clearCart } = useCartStore()

const formatPrice = (value) => `$${value.toLocaleString('en-US')}`
</script>

<template>
    <section class="cart">
        <h1>Cart</h1>

        <div v-if="!items.length" class="empty">
            <p>Your cart is empty.</p>
            <RouterLink to="/">Browse guitars</RouterLink>
        </div>

        <template v-else>
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td>{{ item.title }}</td>
                        <td>{{ formatPrice(item.price) }}</td>
                        <td>
                            <div class="qty">
                                <button @click="setQuantity(item.id, item.quantity - 1)" aria-label="Decrease">−</button>
                                <input
                                    type="number"
                                    min="1"
                                    :max="item.stock"
                                    :value="item.quantity"
                                    @change="setQuantity(item.id, $event.target.value)"
                                />
                                <button
                                    @click="setQuantity(item.id, item.quantity + 1)"
                                    :disabled="item.quantity >= item.stock"
                                    aria-label="Increase"
                                >+</button>
                            </div>
                        </td>
                        <td>{{ formatPrice(item.price * item.quantity) }}</td>
                        <td>
                            <button class="remove" @click="removeFromCart(item.id)">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="summary">
                <p>Items: <strong>{{ itemCount }}</strong></p>
                <p class="total">Total: <strong>{{ formatPrice(totalPrice) }}</strong></p>
                <button class="clear" @click="clearCart">Clear cart</button>
            </div>
        </template>
    </section>
</template>

<style scoped>
.cart-table {
    width: 100%;
    border-collapse: collapse;
}

.cart-table th,
.cart-table td {
    padding: 0.75rem;
    border-bottom: 1px solid #ddd;
    text-align: left;
}

.qty {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.qty input {
    width: 3.5rem;
    text-align: center;
}

.summary {
    margin-top: 1.5rem;
    text-align: right;
}

.total {
    font-size: 1.25rem;
}

.remove,
.clear {
    color: #b00020;
}

.empty {
    padding: 2rem 0;
}
</style>
