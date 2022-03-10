<script>
    export let val;
    // export let type = 'text';
    export function empty() {
        val='';
    }
</script>

<input type="text" bind:value={val}/>
