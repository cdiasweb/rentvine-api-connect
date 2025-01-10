<template>
    <div class="container">
        <div>
            <TextInput v-model="searchTermPayees" label="Search Payees (contactId -> payeeContactID)" @keyup="searchPayees"/>
            <div class="card" v-for="result in payees">
                <div v-for="field in Object.entries(result.contact)">
                    {{field[0]}}: {{field[1]}}
                </div>
            </div>
        </div>

        <div>
            <TextInput v-model="searchTermLedgers" @keyup="searchLedgers" label="Search Payers (ledgerID)"></TextInput>
            <div class="card" v-for="result in ledgers">
                <div v-for="field in Object.entries(result.ledger)">
                    {{field[0]}}: {{field[1]}}
                </div>
            </div>
        </div>

        <div>
            <TextInput v-model="searchTermPortfolios" label="Search Portfolios" @keyup="searchPortfolios"/>
            <div class="card" v-for="result in portfolios">
                <div v-for="field in Object.entries(result.portfolio)">
                    {{field[0]}}: {{field[1]}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import axiosInstance from "@/util/axios.js";
import TextInput from "@/views/TextInput.vue";

defineProps({
  msg: String,
})

const searchTermLedgers = ref(null);
const ledgers = ref([]);

const searchTermPortfolios = ref(null);
const portfolios = ref([]);

const waitToSearch = ref();

const searchTermPayees = ref(null);
const payees = ref([]);

const searchLedgers = async () => {
    clearTimeout(waitToSearch.value);
    waitToSearch.value = setTimeout(async () => {
        const result = await axiosInstance.get(`/manager/accounting/ledgers/search?search=${searchTermLedgers.value}`);
        ledgers.value = result.data;
    }, 1000);
}

const searchPortfolios = async () => {
    clearTimeout(waitToSearch.value);
    waitToSearch.value = setTimeout(async () => {
        const result = await axiosInstance.get(`/manager/portfolios/search?search=${searchTermPortfolios.value}`);
        portfolios.value = result.data;
    }, 1000)
}

const searchPayees = () => {
    clearTimeout(waitToSearch.value);
    waitToSearch.value = setTimeout(async () => {
        const result = await axiosInstance.get(`/manager/contacts/search?search=${searchTermPayees.value}`);
        payees.value = result.data;
    }, 1000);
}

</script>

<style scoped>
.read-the-docs {
  color: #888;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 100px;
}

.card {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 15px;
    margin-bottom: 20px;
    border: solid 1px whitesmoke;
}
</style>
