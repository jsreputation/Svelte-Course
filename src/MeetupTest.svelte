<script>
    import Header from './UI/Header.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import EditMeetup from "./Meetups/EditMeetup.svelte";
    import Button from "./UI/Button.svelte";

    let meetups = [
        {
            id: 'm1',
            title: 'Coding Bootcamp',
            subTitle: 'Learn to code in 2 hours',
            description: 'In this meetup, we will have some experts that teach you how to code!',
            imageUrl: 'https://learnenglish.britishcouncil.org/sites/podcasts/files/RS6243_175211709-hig.jpg',
            address: '27th Nerd Road, 32523 New York',
            email: 'code@test.com',
            isFavorite: false
        },
        {
            id: 'm2',
            title: 'Swim Together',
            subTitle: 'Let\'s got for some swimming',
            description: 'we will simply swim some rounds !',
            imageUrl: 'https://img.olympicchannel.com/images/image/private/t_16-9_3200/primary/piultz6nngltq541xmju',
            address: '27th Nerd Road, 32523 New York',
            email: 'swim@test.com',
            isFavorite: false
        }
    ]

    let editMode;

    const cancelEdit = () => {
        editMode = null;
    }

    const addMeetup = (event) => {
        const {title, subTitle, email, description, imageUrl, address} = event.detail;
        const newMeetup = {
            id: Math.random().toString(),
            title: title,
            subTitle: subTitle,
            email: email,
            description: description,
            imageUrl: imageUrl,
            address: address
        };
        meetups = [newMeetup, ...meetups];
        cancelEdit();
    }

    const toggleFavorite = (event) => {
        const id = event.detail;
        const updatedMeetup = {...meetups.find((m) => m.id === id)};
        updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
        const meetupIndex = meetups.findIndex((m) => m.id === id);
        const updatedMeetups = [...meetups];
        updatedMeetups[meetupIndex] = updatedMeetup;
        meetups = updatedMeetups;
    };
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
    <div class="meetup-controls">
        <Button on:click={() => editMode = 'add'}>New Meetup</Button>
    </div>
    {#if editMode === 'add'}
        <EditMeetup on:save={addMeetup} on:cancel={cancelEdit}/>
    {/if}

    <MeetupGrid meetups={meetups}
        on:toggle-favorite={toggleFavorite}
    />
</main>



