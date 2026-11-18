import { ref, computed, watch } from 'vue';
import { useToast } from 'vue-toastification';

const STORAGE_KEY = 'webshop-cart';

function loadCart() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
        return [];
    }
}

// Each item: { id, title, price, stock, quantity }
const items = ref(loadCart());

watch(items, (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}, { deep: true });

const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0));

const toast = useToast();

export function useCartStore() {
    function addToCart(guitar) {
        if (guitar.stock <= 0) {
            toast.error(`${guitar.title} is out of stock`);
            return;
        }
        const existing = items.value.find((item) => item.id === guitar.id);
        if (existing) {
            if (existing.quantity >= guitar.stock) {
                toast.warning(`Only ${guitar.stock} in stock`);
                return;
            }
            existing.quantity++;
        } else {
            items.value.push({
                id: guitar.id,
                title: guitar.title,
                price: guitar.price,
                stock: guitar.stock,
                quantity: 1,
            });
        }
        toast.success(`${guitar.title} added to cart`);
    }

    function setQuantity(id, quantity) {
        const item = items.value.find((item) => item.id === id);
        if (!item) return;
        const qty = Math.floor(Number(quantity));
        if (!qty || qty < 1) {
            removeFromCart(id);
            return;
        }
        item.quantity = Math.min(qty, item.stock);
    }

    function removeFromCart(id) {
        items.value = items.value.filter((item) => item.id !== id);
    }

    function clearCart() {
        items.value = [];
    }

    return { items, itemCount, totalPrice, addToCart, setQuantity, removeFromCart, clearCart };
}
