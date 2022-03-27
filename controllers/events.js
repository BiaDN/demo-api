
require('dotenv/config')
const Web3 = require('web3');
const fs = require('fs');
const ABI = JSON.parse(fs.readFileSync('./contracts/BTCSweet.json')).abi;

const cron = require('node-cron');
const shell = require('shelljs')

const Event = require('../models/Event')
const EventCron = require('../models/EventCron')

var ethers = require('ethers');
var crypto = require('crypto');





const web3 = new Web3(`wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_ID}`);
const CONTRACT_ADDRESS = process.env.contractToken;
const contractToken = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

// console.log(contractGame.methods)

const runCronNode = async (req, res) => {
    var id = crypto.randomBytes(32).toString('hex');
    var privateKey = "0x" + id;
    console.log("SAVE BUT DO NOT SHARE THIS:", privateKey);
    var wallet = new ethers.Wallet(privateKey);
    console.log("Address: " + wallet.address);
    console.log('start')
    cron.schedule("*/5 * * * * *", async function () {

        let balance;
        balance = await contractToken.methods
            .balanceOf(wallet.address)
            .call({ from: '0x67c5c3793BC1045091AdE4E5eD34EB71dC036faF' }, (err, res) => console.log(res));
        // time = Date.now();
        let options = {
            filter: {
                to: wallet.address,
            },
            fromBlock: "latest",                  //Number || "earliest" || "pending" || "latest"
            toBlock: 'latest'
        };

        console.log('schedule running');
        console.log(Date.now());
        contractToken.getPastEvents('Transfer', options)
            .then(result =>
                postEveCron(result[result.length - 1], balance)
            )
            .catch(err => console.log('error', err.message, err.stack));

    }
    )
}
// .then(result => { if (result) res.send({ Status: '200', msg: 'success' }) })

const getEventByAddress = async (req, res) => {
    let options = {
        filter: {
            to: req.params.address,
        },
        fromBlock: 10394549,                  //Number || "earliest" || "pending" || "latest"
        toBlock: 'latest'
    };
    contractToken.getPastEvents('Transfer', options)
        .then(result => res.send({ result: result, index: result.length }))
        .catch(err => console.log('error', err.message, err.stack));
}

const getAllEvent = async (req, res) => {
    let options = {
        filter: {
            to: '0xfD563bd4aF61641676419Ae8cb222862e6754BE1',
        },
        fromBlock: 10394549,                  //Number || "earliest" || "pending" || "latest"
        toBlock: 'latest'
    };

}



async function postEve(data) {
    if (data) {

        const { address, blockHash, blockNumber, transactionHash, id, returnValues, event, signature, raw } = data;
        const newEvent = await Event.create({
            address, blockHash, blockNumber, transactionHash, id, returnValues, event, signature, raw
        })
        // array.push(newEvent)
        // }
        console.log({ newEvent })
        return newEvent;
    }
    // const array = [];
    // for (var i of data) {
}

async function postEveCron(data, balance) {
    if (data) {

        const { address, blockHash, blockNumber, transactionHash, id, returnValues, event, signature, raw } = data;
        const newEvent = await EventCron.create({
            address, blockHash, blockNumber, transactionHash, id, returnValues, event, signature, raw, balance
        })
        // array.push(newEvent)
        // }
        console.log({ newEvent })
        return newEvent;
    }
    // const array = [];
    // for (var i of data) {
}

const postEvent = async (req, res) => {
    let options = {
        filter: {
            to: '0xfD563bd4aF61641676419Ae8cb222862e6754BE1',
        },
        fromBlock: 10394549,
        toBlock: 'latest'
    };

    contractToken.getPastEvents('Transfer', options)
        .then(result => postEve(result[result.length - 1])).then((result) => res.send(result))
        .catch(err => console.log('error', err.message, err.stack));

}

module.exports = {
    getEventByAddress,
    postEvent,
    getAllEvent,
    runCronNode
}
