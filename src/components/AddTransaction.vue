<script setup>
    import { ref } from 'vue';
    // Needs installing: $ npm i vue-toastification@next
    // Also requires referencing in src/main.js
    import { useToast } from 'vue-toastification';

    const text = ref('');
    const amount = ref('');

    const emit = defineEmits(['txSubmitted']);
    const toast = useToast();
    
    const onSubmit = () => {
        if (!text.value || !amount.value) {
            // The toast message duration time is set globally in 'src/main.js',
            // but can also be set independently by passing as 2nd param: ('Both fields must be filled!',{ timeout: 2000 })
            toast.error('Both fields must be filled!');
            return;
        }

        const txData = {
            text: text.value,
            amount: parseFloat(amount.value)
        }

        emit('txSubmitted', txData);

        text.value = '';
        amount.value = '';
        
        // console.log(text.value, amount.value);
    };
</script>

<template>
    <h3>Add new TX</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">Text</label>
            <input type="text" id="text" v-model="text" placeholder="Enter text..." autocomplete="off" />
        </div>
        <div class="form-control">
            <label for="amount">Amount <br />
            (negative - expense, positive - income)</label>
            <input type="text" id="amount" v-model="amount" placeholder="Enter amount..." autocomplete="off" />
        </div>
        <button class="btn">Add TX</button>
    </form>
</template>
