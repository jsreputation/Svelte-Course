<script>
    import Header from './UI/Header.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import EditMeetup from "./Meetups/EditMeetup.svelte";
    import Button from "./UI/Button.svelte";
    import meetups from "./Meetups/meetups-store";
    import MeetupDetails from "./Meetups/MeetupDetails.svelte";

    let editMode;
    let editedId;
    let page = 'overview';
    let pageData = {};

    const cancelEdit = () => {
        editMode = null;
        editedId = null;
    }

    const savedMeetup = () => {
        cancelEdit();
    }

    const showDetails = (event) => {
        pageData.id = event.detail;
        page = 'Details';
    }

    const closeMeetupDetail = () => {
        pageData = {};
        page = 'overview';
    }

    const startEdit = (event) => {
        editMode = 'edit';
        editedId = event.detail;
    }
</script>

<style>
    main {
        margin-top: 5rem;
    }
    .meetup-controls {
        margin: 1rem;
    }
</style>

<Header />
<main>
    {#if page === 'overview'}
    <div class="meetup-controls">
        <Button on:click={() => editMode = 'edit'}>New Meetup</Button>
    </div>
    {#if editMode === 'edit'}
        <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
    {/if}

    <MeetupGrid meetups={$meetups} on:showDetails={showDetails} on:edit={startEdit} />
    {:else}
        <MeetupDetails id={pageData.id} on:close={closeMeetupDetail} />
    {/if}
</main>



