# Aadhaar Voting
Aadhaar-Based voting system using blockchain technology

## Description

* The authority must log in first with the provided session ID.
* The voter can now begin the process of voting with proper authentication through OTP(one-time password) on the respective linked mobile number.
* If the voter is valid then the system will check for for the voter's age and the address to which he can give a vote.
* The voting pallet will be opened with  candidate names, their parties, and logos.
* Now the voter can give his vote by clicking the vote button.
* one voter can give his vote only once, i.e. after one time voting buttons are disabled and the vote is automatically logged out.
* The same process continues for many more voters irrespective of their voting wards.

### Installing and Running Project

Clone Project
```
https://github.com/Sushantspatil/major_project_voting.git && cd major_project_voting
```
Install Dependencies
```
npm install
```
Running Project
```
node index.js
```
If a dependency problem occurs delete package.json, Run
```
npm init
```
Again Install dependencies and run the project.


### Running Project
Step 1 - Setting up the Environment
Instead of developing the app against the live Ethereum blockchain, we have used an in-memory blockchain (think of it as a blockchain simulator) called testrpc.

```
npm install ethereumjs-testrpc web3
```

Step 2 - Creating a Voting Smart Contract

```
npm install solc
```

Replace your aadhaar no and phone number at major_project_voting/ui/js/app.js#L39

Step 3 - Testing in node console

Not required just for testing in node console-
After writing our smart contract, we'll use Web3js to deploy our app and interact with it
```
$ node
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
Then ensure Web3js is initialized and can query all accounts on the blockchain
Lastly, compile the contract by loading the code from Voting.sol into a string variable and compiling it

> code = fs.readFileSync('Voting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
```
Deploy the contract!

bytecode which will be deployed to the blockchain.
The interface of the contract (called abi) tells the contract user what methods are available in the contract.

```
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> VotingContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> deployedContract = VotingContract.new(['Sushant','Jagruti','Sakshi','Amol'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address
> contractInstance = VotingContract.at(deployedContract.address)
> contractInstance.totalVotesFor.call('Sushant').toLocaleString()
```

Step 4 - Interacting with the Contract via the Nodejs Console
```
> contractInstance.totalVotesFor.call('Sushant').toLocaleString()
'2'
```


Make sure you have ganache-cli (run it on cmd to avoid some minor error)
```
sudo npm install ganache-cli -g
```
copy address of the first account
```
$ ganache-cli
```
Paste this address to 
ui/js/clist.js line 17
major_project_voting/ui/js/clist.js#L17


### Purpose of the test

 * The authority login is to ensure security to prevent piracy, harassment, and corruption from candidates standing in the election.
 * OTP generation is to authenticate the right Aadhar card owner.
 * button disabling and automatic logout are to prevent multiple voting by a single candidate. 



## Deployment

The Aadhaar-based voting system is developed to overcome the flaws of the EVM system. So directly EVM will be replaced by a screen interface the great user interface and high security.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
