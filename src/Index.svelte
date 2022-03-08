<script>
    import Header from './UI/Header.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import TextInput from "./UI/TextInput.svelte";
    import Button from './UI/Button.svelte';

    let meetups = [
        {
            id: 'm1',
            title: 'Coding Bootcamp',
            subTitle: 'Learn to code in 2 hours',
            description: 'In this meetup, we will have some experts that teach you how to code!',
            imageUrl: 'https://learnenglish.britishcouncil.org/sites/podcasts/files/RS6243_175211709-hig.jpg',
            address: '27th Nerd Road, 32523 New York',
            contactEmail: 'code@test.com'
        },
        {
            id: 'm2',
            title: 'Swim Together',
            subTitle: 'Let\'s got for some swimming',
            description: 'we will simply swim some rounds !',
            imageUrl: 'https://img.olympicchannel.com/images/image/private/t_16-9_3200/primary/piultz6nngltq541xmju',
            address: '27th Nerd Road, 32523 New York',
            contactEmail: 'swim@test.com'
        }
    ]

    let title = '';
    let subTitle = '';
    let email = '';
    let description = '';
    let imageUrl = '';
    let address = '';

    const addMeetup = () => {
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
    }
</script>

<style>
    main {
        margin-top: 5rem;
    }
    form {
        width: 30rem;
        max-width: 90%;
        margin: auto;
    }
</style>

<Header />
<main>
    <form on:submit|preventDefault={addMeetup}>
        <TextInput
                id="title"
                label="Title"
                type="text"
                value={title}
                on:input={event => {title = event.target.value}} />
        <TextInput
                id="subtitle"
                label="Subtitle"
                type="text"
                value={subTitle}
                on:input={event => (subTitle = event.target.value)} />
        <TextInput
                id="address"
                label="Address"
                type="text"
                value={address}
                on:input={event => (address = event.target.value)} />
        <TextInput
                id="imageUrl"
                label="Image URL"
                type="text"
                value={imageUrl}
                on:input={event => (imageUrl = event.target.value)} />
        <TextInput
                id="email"
                label="E-Mail"
                type="email"
                value={email}
                on:input={event => (email = event.target.value)} />
        <TextInput
                id="description"
                label="Description"
                controlType="textarea"
                value={description}
                rows="3"
                on:input={event => (description = event.target.value)} />
        <Button type="submit" caption="Save" />
    </form>
    <MeetupGrid meetups={meetups}/>
</main>



