<script>
	import ContactCard from "./ContactCard.svelte";

	let name = "Max";
	let title = "";
	let image = "";
	let description = "";
	let formState = "empty";
	let createdContacts = [];
	const addContact = () => {
		if (name.trim().length === 0 || title.trim().length === 0 || image.trim().length === 0 || description.trim().length === 0) {
			formState = 'invalid';
			return;
		}
		createdContacts = [...createdContacts, {
				id: Math.random(),
				name: name,
				jobTitle: title,
				imageUrl: image,
				desc: description
			}
		];
		formState = 'done';
	}

	const deleteFirst = () => {
		createdContacts = createdContacts.slice(1);
	}

	const deleteLast = () => {
		createdContacts = createdContacts.slice(0, -1);
	}
</script>

<main>
	<form id="form">
		<div class="form-control">
			<label for="userName">User Name</label>
			<input type="text" bind:value={name} id="userName" />
		</div>
		<div class="form-control">
			<label for="jobTitle">Job Title</label>
			<input type="text" bind:value={title} id="jobTitle" />
		</div>
		<div class="form-control">
			<label for="image">Image URL</label>
			<input type="text" bind:value={image} id="image" />
		</div>
		<div class="form-control">
			<label for="desc">Description</label>
			<textarea rows="3" bind:value={description} id="desc" />
		</div>
		<button on:click|preventDefault={addContact} type="submit">Add Contact Card</button>
	</form>
	<button on:click={() => { createdContacts = createdContacts.slice(1); }}>Delete First</button>
	<button on:click={() => { createdContacts = createdContacts.slice(0,-1); }}>Delete Last</button>

	{#if formState === 'invalid'}
		<p>Invalid Input</p>
	{:else}
		<p>Please enter some data and hit the button</p>
	{/if}

	{#each createdContacts as contact, index (contact.id)}
			<h2># {index + 1}</h2>
			<ContactCard
				userName={contact.name}
				jobTitle={contact.jobTitle}
				description={contact.desc}
				userImage={contact.imageUrl}
			/>
		{:else}
		 <p>Please start adding some contacts, we found none !</p>
	{/each}
</main>

<style>
	main {
		/*text-align: center;*/
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	#form {
		width: 30rem;
		max-width: 100%;
		margin: 1rem 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
