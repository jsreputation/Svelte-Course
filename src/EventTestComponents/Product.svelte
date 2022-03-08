<script>
    import { createEventDispatcher } from 'svelte';

    export let id;
    export let title;
    export let price;
    export let bestseller = false;

    const dispatch = createEventDispatcher();

    function addToCart(productId) {
        dispatch('add-to-cart',productId);
    }

    function deleteProduct(productId) {
        dispatch('delete',productId);
    }
</script>

<article>
    <h1>{title}</h1>
    <h2>${price}</h2>
    {#if bestseller}
        <h3>BESTSELLER</h3>
    {/if}
    <button on:click={() => addToCart(id)}>Add to Cart</button>
    <button on:click={() => deleteProduct(id)}>Delete</button>
</article>
