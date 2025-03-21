<template>
    <div class="container m-0">
        <div>
            <select v-model="selectedOption">
                <option value="">All Fields</option>
                <option value="post_tenant_charges">Post Tenant Charge</option>
            </select>
        </div>
        <br>
        <div class="d-flex">
            <div v-if="selectedOption === ''">
                <TextInput v-model="searchTermPayees" label="Search Payees (contactId -> payeeContactID)" @keyup="searchPayees"/>
                <div class="card" v-for="result in payees">
                    <div>Contact Type: <strong>{{getRightLabelBasedOnContactTypeId(result.contact.contactTypeID)}}</strong></div>
                    <div v-for="field in Object.entries(result.contact)">
                        {{field[0]}}: {{field[1]}}
                    </div>
                </div>
            </div>

            <div v-if="selectedOption === ''">
                <TextInput v-model="searchTermLedgers" @keyup="searchLedgers" label="Search Payers (ledgerID)"></TextInput>
                <div class="card" v-for="result in ledgers">
                    <div v-for="field in Object.entries(result.ledger)">
                        {{field[0]}}: {{field[1]}}
                    </div>
                </div>
            </div>

            <div v-if="selectedOption === ''">
                <TextInput v-model="searchTermPortfolios" label="Search Portfolios" @keyup="searchPortfolios"/>
                <div class="card" v-for="result in portfolios">
                    <div v-for="field in Object.entries(result.portfolio)">
                        {{field[0]}}: {{field[1]}}
                    </div>
                </div>
            </div>

            <div v-if="selectedOption === 'post_tenant_charges' || selectedOption === ''">
                <TextInput v-model="searchTermLeases" label="Search Leases" @keyup="searchLeases"/>
                <div class="card" v-for="result in leases">
                    <strong>Lease</strong>
                    <div v-for="field in Object.entries(result.lease)">
                        {{field[0]}}: {{field[1]}}
                    </div>
                    <strong>Property</strong>
                    <div v-for="field in Object.entries(result.property)">
                        {{field[0]}}: {{field[1]}}
                    </div>
                    <strong>Unit</strong>
                    <div v-for="field in Object.entries(result.unit)">
                        {{field[0]}}: {{field[1]}}
                    </div>
                </div>
            </div>
            <div v-if="selectedOption === 'post_tenant_charges' || selectedOption === ''">
                <TextInput v-model="searchTermAccounts" label="Search Accounts" @keyup="searchAccounts"/>
                <div class="card" v-for="result in accountsTemp">
                    <strong>Account</strong>
                    <div v-for="field in Object.entries(result.account)">
                        {{field[0]}}: {{field[1]}}
                    </div>
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

const selectedOption = ref('post_tenant_charges');

const searchTermLedgers = ref(null);
const ledgers = ref([]);

const searchTermPortfolios = ref(null);
const portfolios = ref([]);

const waitToSearch = ref();

const searchTermPayees = ref(null);
const payees = ref([]);

const searchTermLeases = ref(null);
const leases = ref([]);

const accounts = ref([]);
const searchTermAccounts = ref(null);
const accountsTemp = ref([]);

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
const searchLeases = () => {
    clearTimeout(waitToSearch.value);
    waitToSearch.value = setTimeout(async () => {
        const result = await axiosInstance.get(`manager/leases?search=${searchTermLeases.value}&includes=property%2Cunit`);
        leases.value = result.data;
    }, 1000);
}

const getAccounts = async () => {
    const result = await axiosInstance.get('manager/accounting/accounts');
    accounts.value = result.data;
}

const searchAccounts = () => {
    accountsTemp.value = accounts.value.filter((item) => item.account.name.includes(searchTermAccounts.value));
}

const getRightLabelBasedOnContactTypeId = (contactTypeId) => {
    if (contactTypeId == 1) {
        return 'Owner'
    }
    if (contactTypeId == 2) {
        return 'Tenant'
    }
    if (contactTypeId == 3) {
        return 'Vendor'
    }
    if (contactTypeId == 4) {
        return 'Manager'
    }
    if (contactTypeId == 5) {
        return 'Association'
    }
    if (contactTypeId == 6) {
        return 'Applicant'
    }
}

onMounted(() => {
    getAccounts();
})

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
