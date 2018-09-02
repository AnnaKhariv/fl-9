function userCard(index) {

    let card = {
        key: index,
        balance: 100,
        transactionLimit: 100,
        historyLogs: [],

        addHistoryLogs: function (operationType, credits) {
            let date = new Date();
            let options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };

            return {
                operationType: operationType,
                credits: credits,
                operationTime: date.toLocaleDateString('en-GB', options)
            };
        },

        getCardOptions: function () {
            return {
                key: this.key,
                balance: this.balance,
                transactionLimit: this.transactionLimit,
                historyLogs: this.historyLogs
            };
        },
        putCredits: function (amount) {
            this.balance += amount;
            this.historyLogs.push(this.addHistoryLogs('Received credits', amount));
        },
        takeCredits: function (amount) {
            if (this.balance >= amount) {
                this.balance -= amount;
                this.historyLogs.push(this.addHistoryLogs('Withdrawal of credits', amount));
            } else {
                console.log('Remaining balance are less than credits you want to take!')
            }

        },
        setTransactionLimit: function (transactionLimit) {
            this.transactionLimit = transactionLimit;
            this.historyLogs.push(this.addHistoryLogs('Transaction limit change', transactionLimit));
        },
        transferCredits: function (amount, recipientCard) {
            if (this.balance >= amount && amount <= this.transactionLimit) {
                const TAXES = 0.005;
                amount -= amount * TAXES;
                recipientCard.putCredits(amount);
            } else {
                console.log(`It is impossible to make transaction. Check your balance or transaction limit!`)
            }
        }


    };
    return card;
}

class UserAccount {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.maxCards = 3;
    }

    addCard() {
        if (this.cards.length < this.maxCards) {
            this.cards.push(userCard(this.cards.length + 1));
        } else {
            console.log('It is impossible to make action. Reached the limit of cards!');
        }
    }

    getCardByKey(key) {
        return this.cards[key - 1];
    }
}

