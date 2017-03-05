## Nest Alert sample app with jQuery

A simple alert application that demonstrates how to access the Nest API from a web application by alerting the user when their Nest Protect goes off.

## Requirements

The development environment is a simple Node.js server managed by Yeoman. If you don't have them already install these tools first:

- [Node][node]
- [Yeoman][yeoman]

## Running

To install required Bower components and Node modules, simply type:

``` sh
bower install
npm install
```

You will need to set your redirect URI in the [Nest Developer Portal][portal] to `http://localhost:8080/auth/nest/callback` and grab your your client ID and client secret and set them as environment variables:

``` sh
export NEST_ID=<CLIENT ID>
export NEST_SECRET=<CLIENT SECRET>
```

And finally, use Grunt to start the server:

```sh
grunt
```

Then open http://localhost:8080 in your browser and you will be walked through the authentication process.

## Contributing

Contributions are always welcome and highly encouraged.

See [CONTRIBUTING](CONTRIBUTING.md) for more information on how to get started.

## License

Apache 2.0 - See [LICENSE](LICENSE) for more information.

[node]: https://nodejs.org/en/download/
[yeoman]: http://yeoman.io/learning/index.html
[portal]: https://developer.nest.com/clients
