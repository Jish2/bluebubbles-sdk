# BlueBubbles SDK

The official home of client SDKs for the [BlueBubbles Server API](https://bluebubbles.app).

Each SDK in `sdks/` provides a fully-typed, idiomatic client for interacting with a BlueBubbles server. The `openapi.yaml` spec (derived from the [official BlueBubbles Postman collection](https://documenter.getpostman.com/view/765844/UV5RnfwM)) serves as the source of truth, and each language uses the best available generation tool for that ecosystem.

## Supported Languages

| Language   | Package                                                                  | Directory                                      | Documentation                            |
| ---------- | ------------------------------------------------------------------------ | ---------------------------------------------- | ---------------------------------------- |
| TypeScript | [`@jgoon/bluebubbles`](https://www.npmjs.com/package/@jgoon/bluebubbles) | [`sdks/typescript`](sdks/typescript/README.md) | [`README.md`](sdks/typescript/README.md) |

## Repository Structure

```
bluebubbles-sdk/
├── openapi.yaml              # BlueBubbles OpenAPI 3.0 spec (source of truth)
├── scripts/
│   └── generate.sh           # Regenerate one or all SDKs from the spec
└── sdks/
    └── typescript/            # TypeScript SDK (openapi-typescript + openapi-fetch)
```

## Regenerating

```bash
# All SDKs
./scripts/generate.sh

# TypeScript only
./scripts/generate.sh typescript
```

## Updating the OpenAPI Spec

The spec lives in `openapi.yaml` and was originally generated from the [BlueBubbles Postman collection](https://documenter.getpostman.com/view/765844/UV5RnfwM). If the BlueBubbles Server API changes:

1. Edit `openapi.yaml`.
2. Run `./scripts/generate.sh` to regenerate all SDKs.
3. Commit `openapi.yaml` and the updated `sdks/` directories.

## Contributing

Pull requests are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

## License

[MIT](LICENSE)
