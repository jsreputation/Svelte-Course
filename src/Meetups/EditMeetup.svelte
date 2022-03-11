<script>
    import {createEventDispatcher} from "svelte";
    import Modal from "../UI/Modal.svelte";
    import TextInput from '../UI/TextInput.svelte';
    import Button from '../UI/Button.svelte';
    import {isEmpty, isValidEmail} from "../helpers/validtation";
    import meetups from "./meetups-store";

    export let id = null;

    let title = '';
    let subTitle = '';
    let email = '';
    let description = '';
    let imageUrl = '';
    let address = '';

    if (id) {
        const unsubscribe = meetups.subscribe((items) => {
            const selectedMeetup = items.find(i => i.id === id);
            title = selectedMeetup.title;
            subTitle = selectedMeetup.subTitle;
            email = selectedMeetup.email;
            description = selectedMeetup.description;
            imageUrl = selectedMeetup.imageUrl;
            address = selectedMeetup.address;
        });

        unsubscribe();
    }

    let titleValid = false;
    let subTitleValid = false;
    let emailValid = false;
    let descriptionValid = false;
    let imageUrlValid = false;
    let addressValid = false;
    let formIsValid = false;

    const dispatch = createEventDispatcher();

    function submitForm() {
        const newMeetup = {
            title: title,
            subTitle: subTitle,
            address: address,
            email: email,
            description: description,
            imageUrl: imageUrl
        };

        if (id) {
            meetups.updateMeetup(id, newMeetup);
        } else {
            fetch('https://svelte-course-5c29b-default-rtdb.firebaseio.com/meetups.json', {
                method: 'POST',
                body: JSON.stringify({...newMeetup, isFavorite: false}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('An error occurred, please try again!');
                }
                return res.json();
            }).then((data) => {
                console.log(data);
                meetups.addMeetup({...newMeetup, isFavorite: false, id: data.name});
            }).catch((error) => {
                console.log(error);
            })
            // meetups.addMeetup(newMeetup);
        }
        dispatch('save');
    }

    function cancel() {
        dispatch('cancel');
    }

    function deleteMeetup() {
        meetups.removeMeetup(id);
        dispatch('save');
    }

    $: titleValid = !isEmpty(title);
    $: subTitleValid = !isEmpty(subTitle);
    $: emailValid = isValidEmail(email);
    $: descriptionValid = !isEmpty(description);
    $: imageUrlValid = !isEmpty(imageUrl);
    $: addressValid = !isEmpty(address);
    $: formIsValid = titleValid && subTitleValid && emailValid && descriptionValid && imageUrlValid && addressValid;

</script>

<style>
    form {
        width: 100%;
    }
</style>
<Modal title="Edit Meetup Data" on:cancel>
    <form on:submit|preventDefault={submitForm}>
        <TextInput
                id="title"
                label="Title"
                valid={titleValid}
                validityMessage={"Please enter a valid title."}
                value={title}
                on:input={event => {title = event.target.value}}/>
        <TextInput
                id="subtitle"
                label="Subtitle"
                value={subTitle}
                valid={subTitleValid}
                validityMessage={"Please enter a valid subtitle."}
                on:input={event => (subTitle = event.target.value)}/>
        <TextInput
                id="address"
                label="Address"
                value={address}
                valid={addressValid}
                validityMessage={"Please enter a valid address."}
                on:input={event => (address = event.target.value)}/>
        <TextInput
                id="imageUrl"
                label="Image URL"
                value={imageUrl}
                valid={imageUrlValid}
                validityMessage={"Please enter a valid url"}
                on:input={event => (imageUrl = event.target.value)}/>
        <TextInput
                id="email"
                label="E-Mail"
                type="email"
                value={email}
                valid={emailValid}
                validityMessage={"Please enter a valid email."}
                on:input={event => (email = event.target.value)}/>
        <TextInput
                id="description"
                label="Description"
                controlType="textarea"
                value={description}
                rows="3"
                valid={descriptionValid}
                validityMessage={"Please enter a valid description"}
                on:input={event => (description = event.target.value)}/>
    </form>
    <div slot="footer">
        <Button on:click={submitForm} disabled={!formIsValid}>Save</Button>
        <Button mode="outline" on:click={cancel}>Cancel</Button>
        {#if id}
            <Button type="button" on:click={deleteMeetup}>Delete</Button>
        {/if}
    </div>
</Modal>
