import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './assets/style.css'
import App from './App.vue'

const app = createApp(App)

const conf = {
    timeout: 2400,
    hideProgressBar: true,
    // closeButton: false
    showCloseButtonOnHover: true
};

/*
// import Toast, { TYPE } from 'vue-toastification';
const conf = {
    toastDefaults: {
        // ToastOptions object for each type of toast
        [TYPE.ERROR]: {
            timeout: 10000,
            closeButton: false,
        },
        [TYPE.SUCCESS]: {
            timeout: 3000,
            hideProgressBar: true,
        }    
    }
};
*/

app.use(Toast, conf);
app.mount('#app');
