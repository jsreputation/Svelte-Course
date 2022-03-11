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
</style>

<Header />
<main>
    {#if page === 'overview'}
        {#if editMode === 'edit'}
            <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
        {/if}
        <MeetupGrid meetups={$meetups} on:showDetails={showDetails} on:edit={startEdit} on:add={() => editMode = 'edit'}/>
    {:else}
        <MeetupDetails id={pageData.id} on:close={closeMeetupDetail} />
    {/if}
</main>



