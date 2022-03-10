<script>
    import CustomInput from "./BindingAndFormsComponents/CustomInput.svelte";
    import Toggle from "./BindingAndFormsComponents/Toggle.svelte";
    import { isValidEmail } from './BindingAndFormsComponents/validation.js'

    let val = 'Max';
    let price = 0;
    let selectedOption = 1;
    let agreed = false;
    let favColor = ['red'];
    let singleFavColor = 'red';
    let userNameInput;
    let customInput;
    let enteredEmail = '';
    let formIsValid = false;

    $: if(isValidEmail) {
        formIsValid = true;
    } else {
        formIsValid = false;
    }


    $: console.log(val);
    $: console.log(selectedOption);
    $: console.log(price);
    $: console.log(agreed);
    $: console.log(favColor);
    $: console.log(singleFavColor);

    const saveData = () => {
        // console.log(document.querySelector('#userName').value);
        console.log(userNameInput.value);
        console.dir(userNameInput);
        customInput.empty();
    };
</script>

<style>
    .invalid {
        border: 1px solid red;
    }
</style>

<!--<input type="text" value={val} on:input={setValue}/>-->
<!--<input type="text" bind:value={val}>-->
<CustomInput bind:val={val} bind:this={customInput}/>

<Toggle bind:chosenOption={selectedOption} />

<input type="number" bind:value={price} >

<label>
    <input type="checkbox" bind:checked={agreed} />
    Agree to terms ?
</label>

<h1>Favorite Color ?</h1>
<label>
    <input type="checkbox" value="red" name="color" bind:group={favColor}/>
    Red
</label>
<label>
    <input type="checkbox" value="blue" name="color" bind:group={favColor}/>
    Blue
</label>
<label>
    <input type="checkbox" value="green" name="color" bind:group={favColor}/>
    Green
</label>


<select bind:value={singleFavColor}>
    <option value="green">Green</option>
    <option value="red">Red</option>
    <option value="blue">Blue</option>
</select>

<hr>

<input id="userName" type="text" bind:this={userNameInput}>
<button on:click={saveData}>Save</button>

<form on:submit|preventDefault>
    <input type="email" bind:value={enteredEmail} class={isValidEmail(enteredEmail) ? '': 'invalid'}>
    <button type="submit" disabled={!formIsValid}>Save</button>
</form>

