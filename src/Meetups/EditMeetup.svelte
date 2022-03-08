<script>
    import {createEventDispatcher} from "svelte";
    import Modal from "../UI/Modal.svelte";
    import TextInput from '../UI/TextInput.svelte';
    import Button from '../UI/Button.svelte';

    let title = '';
    let subTitle = '';
    let email = '';
    let description = '';
    let imageUrl = '';
    let address = '';

    const dispatch = createEventDispatcher();

    function submitForm() {
        dispatch('save', {
            title: title,
            subTitle: subTitle,
            address: address,
            email: email,
            description: description,
            imageUrl: imageUrl
        });
    }

    function cancel() {
        dispatch('cancel');
    }
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
                value={title}
                on:input={event => {title = event.target.value}} />
        <TextInput
                id="subtitle"
                label="Subtitle"
                value={subTitle}
                on:input={event => (subTitle = event.target.value)} />
        <TextInput
                id="address"
                label="Address"
                value={address}
                on:input={event => (address = event.target.value)} />
        <TextInput
                id="imageUrl"
                label="Image URL"
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
    </form>
    <div slot="footer">
        <Button on:click={submitForm}>Save</Button>
        <Button mode="outline" on:click={cancel}>Cancel</Button>
    </div>
</Modal>
