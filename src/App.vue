<script setup>
    import Header from './components/Header.vue';
    import Balance from './components/Balance.vue';
    import IncomeExpenses from './components/IncomeExpenses.vue';
    import History from './components/History.vue';
    import AddTransaction from './components/AddTransaction.vue';

    // Required to be reactive - updates display when array data updates
    import { ref, computed, onMounted } from 'vue';
    import { uid } from 'uid'; // Needs installing: $ npm i --save-dev uid
    import { useToast } from 'vue-toastification';

    const toast = useToast();

    // Exists here to make available to all components that require data
    const txs = ref([]);

    onMounted(() => {
        const savedTxs = JSON.parse(localStorage.getItem('txs'));

        if (savedTxs) {
            txs.value = savedTxs;
        }
    });

    // Add all amounts and return total
    const total = computed(() => {
        return txs.value
        .reduce((acc, tx) => {
            return acc + tx.amount;
        }, 0).toFixed(2);
    });

    // Get total income
    const totalIncome = computed(() => {
        return txs.value
        .filter((tx) => tx.amount > 0)
        .reduce((acc, tx) => {
            return acc + tx.amount;
        }, 0).toFixed(2);
    });

    // Get total expenses
    const totalExpenses = computed(() => {
        return txs.value
        .filter((tx) => tx.amount < 0)
        .reduce((acc, tx) => {
            return acc + tx.amount;
        }, 0).toFixed(2);
    });

    // handleTxSubmitted function
    const handleTxSubmitted = (txData) => {
        txs.value.push({
            id: uid(), // Requires import
            text: txData.text,
            amount: txData.amount,
        });

        saveTxsToLocalStorage();

        toast.success('Transaction added');
    }

    // Delete Transaction
    const handleTxDeleted = (id) => {
        // console.log(id);
        txs.value = txs.value.filter((tx) => tx.id !== id);

        saveTxsToLocalStorage();

        toast.success('TX deleted');
    }

    // Save to localstorage
    const saveTxsToLocalStorage = () => {
        localStorage.setItem('txs', JSON.stringify(txs.value));
    }
</script>

<template>
    <Header />
    <div class="container">
        <Balance :total="+total" />
        <IncomeExpenses :totalIncome="+totalIncome" :totalExpenses="+totalExpenses" />
        <History :txs="txs" @txDeleted="handleTxDeleted" /> <!-- Pass in props -->
        <AddTransaction @txSubmitted="handleTxSubmitted" /> <!-- Listen for emit event -->
    </div>
</template>

