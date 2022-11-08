# react-flocc-simulations

## About

This is a personal project for testing Agent Based Models in javascript, using [FloccJS](https://flocc.network/).

The project currently has the following scenarios:

### The Tributes Games [link](https://flocc.network/model/tribute-model)

This model, based on Robert Axelrod’s Building New Political Actors, attempts to show how state-like actors can emerge, gain power over other entities, and dissipate over time. In 20th century history, the Soviet Union provides an example of this lifecycle, emerging with the Russian Revolution of 1917, building its sphere of influence post-World War II, and dissolving in the early 1990s.

In this model, ten entities are situated on a linear landscape. Each turn, three are randomly chosen to demand tribute from others, who in turn may choose to either pay or to fight. By paying tribute, commitments are formed between more powerful and less powerful entities, and entities committed to each other may fight together against their enemies (fighting leads to decreased commitment). The functions of tribute and bidirectional commitments can lead to a dynamic political landscape, with actors gaining power and influence and sometimes losing it as others emerge over time.

## Usage

1. Clone the repo
    ```sh
    git clone https://github.com/MikeBlakeway/react-flocc-simulations.git react-flocc-simulations
    ```
2. Install NPM packages
    ```sh
    cd react-flocc-simulations
    npm install
    ```
3. Start the application
    ```sh
    npm start
    ```
