# NuSwitch

## By Gioacchino Di Nardo

### Get Started

1. Install dependencies

```bash
yarn
```

or

```bash
npm install
```

2. Use the app.

  From the root directory, run the following in the terminal

  ```bash
  ./bin/comparison ./plans.json
  ```

### Commands

  1. `price` command

  Once the app is running, insert price command. For example:

  ```bash
  price 1000
  price 2000
  ```

  2. `usage` command

  Use the following examples:

  ```bash
  usage edf fixed 350
  usage ovo standard 1000
  usage bg standing-charge 120
  ```

  3. `exit` command

  To simply exit the application, run

  ```bash
  exit
  ```

### Run Tests

   In order to run the all the tests, use the following command:

   ```bash
   yarn test
   ```

   or

   ```bash
   npm run test
   ```

### Notes

   Hope you enjoy the app, I did! :)
