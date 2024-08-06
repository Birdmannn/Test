# dApp-Taco-API
This is a decentralized application which implemts the [cartesi](https://docs.cartesi.io) blockchain rollup technology. Here people create different tacos using different ingredients of their choice, and placing orders on those tacos using a decentralized platform.

# Setting up your environment
For this project to run locally, you'll need Node.js to be installed, [version 18.20.4 (LTS)](https://nodejs.org/en/download/package-manager) if I were to recommend.
You'll need [Docker desktop](https://www.docker.com/products/docker-desktop/) too, in order to create a container and start the machine
And you'll need to install the cartesi-cli. You can do this using npm in your terminal
```
npm install -g @cartesi/cli
```
## Clone and build
1. Clone this repo. Click on the green `code` button (top right) for the different ways to clone
2. Do
```
npm install
```
3. When you have navigated to the root folder containing these files, build using
```
cartesi build
```
4. When the build is successful, you can run it using
```
cartesi run
```
# Principles of Use
## For Advance (POST) methods
### Creating an order
Example of how the payload will look like
```json
{
    "action": "createOrder",
    "data": {
        "owner": <0x-address>
    }
}
```
- convert the following payload (which is a string) to hex. You can use [this website](https://codebeautify.org/string-hex-converter) for the conversion
- then send it as an input using the cartesi cli on another terminal, with default parameters.

### Adding a Taco to the Order
-The sequence is --an order is first created, then a taco is initialized and added to the order, then ingredients that make up the taco are then added to the taco entity.

```json
{
    "action": "addTaco",
    "data": {
        "name": "Divine Taco"
    }
}
```
Here, the ingredients will be initially empty. You can add your ingredients once you've created your taco.
- Follow the previous instructions to interact with the blockchain.

### Adding your ingredient to your Taco
```json
{
    "action": "addIngredient",
    "data": {
        "name": "Flour Tortilla",
        "type": "wrap",
    },
}
```
It is worth noting that the only available values for the type are:
- wrap
- protein
- veggies
- cheese, and
- sauce
interact with the blockchain as instructed above

## For Inspect (GET) methods
for inspect, all returned payloads are at a particular endpoint named:
```
http://localhost:8080/inspect
```
### Getting all orders
so we append `/orders`, which gives:
```
http://localhost:8080/inspect/orders
```
- which returns a JSON. Copy out the payload, and convert the hex into a string to see view the output.

### Getting an order by id
Append `/orders/${id}` to the path
```
http://localhost:8080/inspect/orders/${id}
```
- where the `id` placeholder is replaced by the id of the order
- Copy out the returned payload value of the JSON, and convert to string.

# Contributions
Feel free to fork this repository and add some of your changes :)

# Acknowledgments
I specially thank the Cartesi development team and contributors, and mostly, my colleagues who gave me the zeal to partake in this project.

