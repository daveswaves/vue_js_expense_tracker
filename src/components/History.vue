<script setup>
    const emit = defineEmits(['txDeleted']);
    
    // Required to use 'const txs' in 'src/App.vue'
    const props = defineProps({
        txs: {
            type: Array,
            required: true
        }
    });

    const deleteTx = (id) => {
        emit('txDeleted', id);
    };
</script>

<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <li
            v-for="tx in txs"
            :key="tx.id"
            :class="tx.amount < 0 ? 'minus' : 'plus'"
        >
            {{tx.text}} <span>{{tx.amount}}</span><button @click="deleteTx(tx.id)" class="delete-btn">x</button>
        </li>
    </ul>

    <!-- https://youtu.be/hNPwdOZ3qFU?t=1451 -->
</template>
