<script>
    import MeetupItem from "./MeetupItem.svelte";
    import MeetupFilter from "./MeetupFilter.svelte";
    import Button from "../UI/Button.svelte";
    import {createEventDispatcher} from "svelte";
    import {flip} from "svelte/animate";
    import {scale} from "svelte/transition";

    export let meetups;

    const dispatch = createEventDispatcher();

    let favsOnly = false;

    let filteredMeetups;

    $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite): meetups;

    const setFilter = (event) => {
        favsOnly = event.detail === 1;
    }
</script>

<style>
     #meetups {
         width: 100%;
         display: grid;
         grid-template-columns: 1fr;
         grid-gap: 1rem;
     }

     #meetup-controls {
         margin: 1rem;
         display: flex;
         justify-content: space-between;
     }

     @media (min-width: 768px) {
         #meetups {
             grid-template-columns: repeat(2, 1fr);
         }
     }
</style>
<section id="meetup-controls">
    <MeetupFilter on:select={setFilter}/>
    <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>

<section id="meetups">
    {#each filteredMeetups as meetup (meetup.id)}
        <div transition:scale animate:flip={{duration: 300}}>
            <MeetupItem {...meetup} on:toggle-favorite on:showDetails on:edit/>
        </div>
    {/each}
</section>
