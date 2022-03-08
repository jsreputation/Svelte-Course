<script>
    import Product from './EventTestComponents/Product.svelte';
    import Modal from './EventTestComponents/Modal.svelte';

    let showModal = false;
    let closeable = false;

    const products = [
        {
            id: 'p1',
            title: 'A book',
            price: 9.99
        },
        {
            id: 'p2',
            title: 'A pencil',
            price: 3.99
        },
        {
            id: 'p3',
            title: 'An eraser',
            price: 5.99
        },
        {
            id: 'p4',
            title: 'A bullpen',
            price: 2.99
        },
    ]

    function addToCart(event) {
        console.log(event.detail);
    }

    function deleteProduct(event) {
        console.log(event.detail);
    }
</script>

{#each products as product }
    <Product
            {...product}
            on:add-to-cart={addToCart}
            on:delete={deleteProduct}
    />
{/each}

<button on:click={() =>  (showModal = true)}>Show Modal</button>
{#if showModal}
    <Modal
            on:cancel={() => (showModal = false)}
            on:close={() => (showModal = false)}
            let:didAgree={closeable}
    >
        <h1 slot="header">Hello !</h1>
        <p>This works  !</p>
        <button slot="footer" on:click={() => (showModal = false)} disabled={!closeable}>Confirm</button>
    </Modal>
{/if}
