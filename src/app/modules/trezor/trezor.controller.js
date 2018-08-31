import nem from 'nem-sdk';

class TrezorCtrl {

    /**
     * Initialize dependencies and properties
     *
     * @params {services} - Angular services to inject
     */
    constructor(AppConstants, $timeout, Alert, Login, Trezor) {
        'ngInject';

        //// Module dependencies region ////

        this._AppConstants = AppConstants;
        this._$timeout = $timeout;
        this._Alert = Alert;
        this._Login = Login;
        this._Trezor = Trezor;

        //// End dependencies region ////

        //// Module properties region ////
        /**
         * List of accounts
         */        
		var allAccounts = {
		    0: "#1",
		    1: "#2",
		    2: "#3",
		    3: "#4",
		    4: "#5",
		    5: "#6",
		    6: "#7",
		    7: "#8",
		    8: "#9",
		    9: "#10"
		};
        
        /**
         * Default network
         *
         * @type {number}
         */
        this.network = this._AppConstants.defaultNetwork;

        /**
         * Available networks
         *
         * @type {object} - An object of objects
         */
        this.networks = nem.model.network.data;

        /**
         * Account
         *
         * @type {number}
         */
        this.account = 0;

		/**
         * All accounts available
         *
         * @type {object} - An object of objects
         */        
		this.accounts = Object.keys(allAccounts).map(function (key) {
            return { id: key, text: allAccounts[key] };
		});
        
        //// End properties region ////
    }

    //// Module methods region ////

    /**
     * Change wallet network
     *
     * @param {number} id - The network id to use at wallet creation
     */
    changeNetwork(id) {
        if (id == nem.model.network.data.mijin.id && this._AppConstants.mijinDisabled) {
            this._Alert.mijinDisabled();
            // Reset network to default
            this.network = this._AppConstants.defaultNetwork;
            return;
        } else if (id == nem.model.network.data.mainnet.id && this._AppConstants.mainnetDisabled) {
            this._Alert.mainnetDisabled();
            // Reset network to default
            this.network = this._AppConstants.defaultNetwork;
            return;
        }
        // Set Network
        this.network = id;
    }

    /**
     * Change account
     *
     * @param {number} id - Account id
     */
    changeAccount(id) {
        this.account = id;
    }
    
    /**
     * Login with TREZOR
     */
    login() {
        this._Trezor.createWallet(this.network).then((wallet) => {
            this._Login.login({}, wallet);
        }, (error) => {
            this._$timeout(() => {
                this._Alert.createWalletFailed(error);
            });
        });
    }


    //// End methods region ////

}

export default TrezorCtrl;
