import {fromWei} from '../api/web3Api';

export function getExtendedWeb3Provider(web3Provider) {
    // Found here https://gist.github.com/xavierlepretre/88682e871f4ad07be4534ae560692ee6
    web3Provider.eth.getTransactionReceiptMined = function (txnHash, interval) {
        var transactionReceiptAsync;
        interval = interval ? interval : 500;
        transactionReceiptAsync = function(txnHash, resolve, reject) {
            try {
                var receipt = web3Provider.eth.getTransactionReceipt(txnHash);
                if (receipt == null) {
                    setTimeout(function () {
                        transactionReceiptAsync(txnHash, resolve, reject);
                    }, interval);
                } else {
                    resolve(receipt);
                }
            } catch(e) {
                reject(e);
            }
        };

        if (Array.isArray(txnHash)) {
            var promises = [];
            txnHash.forEach(function (oneTxHash) {
                promises.push(web3Provider.eth.getTransactionReceiptMined(oneTxHash, interval));
            });
            return Promise.all(promises);
        } else {
            return new Promise(function (resolve, reject) {
              transactionReceiptAsync(txnHash, resolve, reject);
            });
        }
    };

    return web3Provider;
}

export function getEtherscanLink(address) {
    return `https://testnet.etherscan.io/address/${address}`;
}

export function getFormattedUserAccount(address, balance) {
    let userBalance = parseFloat(fromWei(balance)).toFixed(3);
    return `${address} (${userBalance} ETH)`;
}

export function getFormattedProgressPercentage(fundingRaised, fundingGoal) {
    return Number(((Number(fundingRaised) / Number(fundingGoal)) * 100).toFixed(2))
}

export function getProjectStatus(currentBlock, deadlineBlock, fundsRaised, fundingGoal) {
    let status = "-";

    if (currentBlock > deadlineBlock) {
        if (fundsRaised >= fundingGoal) {
            status = "Funded";
        } else {
            status = "Failed";
        }
    } else {
        if (fundsRaised >= fundingGoal) {
            status = "Funded";
        } else {
            status = "Active";
        }
    }
    return status;
}
