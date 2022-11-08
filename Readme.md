# Snapshot Scripts

Helper scripts for Snapshot voting.

## Installation

```shell
pnpm install
```

## Usage

### VoterProxy

Firstly get a vote hash:

```shell
pnpm run vote \
--space "snapshot.brianbutterfield.eth" \
--proposal "0x7ec160a906206582e21b07e1570b6214ced068549369e6bb27ac3ec225c1a2db" \
--choice 2
```

```shell
# Output:
Vote hash:
0x1edf2f3dc65c5a6fbf6cca0fdd40fd27f2c686335d2e8b4c41432b128cb53682
```

Then set this hash for the VoterProxy with `Booster.setVote`.

Then send the vote to Snapshot by adding the `vote` option:

```shell
pnpm run vote \
--space "snapshot.brianbutterfield.eth" \
--proposal "0x7ec160a906206582e21b07e1570b6214ced068549369e6bb27ac3ec225c1a2db" \
--choice 2 \
--vote
```

```json5
// Output:
{
  "id": "0x1edf2f3dc65c5a6fbf6cca0fdd40fd27f2c686335d2e8b4c41432b128cb53682",
  "ipfs": "bafkreick3yd7fcpwnsog2q7adky66n2ngecx3vbhamczuia63tst5egjda",
  "relayer": {
    "address": "0x8BBE4Ac64246d600BC2889ef5d83809D138F03DF",
    "receipt": "0x822fda58084bec55039a5bcee8fe685149465b61473b95bc660e4e171cf754af17aa616d3a299586018d695f57098a2408555bc70b0e19f50f2c7e035981172e1b"
  }
}
```
