import snapshot from '@snapshot-labs/snapshot.js'
import commandLineArgs from 'command-line-args'

async function main() {
  const options = commandLineArgs([
    { name: 'vote', alias: 'v', type: Boolean, defaultOption: false },
    { name: 'space', alias: 's', type: String },
    { name: 'proposal', alias: 'p', type: String },
    { name: 'choice', alias: 'c', type: Number },
    { name: 'reason', alias: 'r', type: String },
  ])
  if (!options.space) {
    throw new Error('Missing option --space (e.g. aurafinance.eth)')
  }
  if (!options.proposal) {
    throw new Error('Missing option --proposal (proposal hash)')
  }
  if (!options.choice) {
    throw new Error('Missing option --choice (numeric vote choice)')
  }

  const voterProxy = '0xaF52695E1bB01A16D33D7194C28C42b10e0Dbec2'

  const typedMsg = {
    address: voterProxy,
    sig: '0x',
    data: {
      domain: { name: 'snapshot', version: '0.1.4' },
      types: {
        Vote: [
          { name: 'from', type: 'address' },
          { name: 'space', type: 'string' },
          { name: 'timestamp', type: 'uint64' },
          { name: 'proposal', type: 'bytes32' },
          { name: 'choice', type: 'uint32' },
          { name: 'reason', type: 'string' },
          { name: 'app', type: 'string' },
        ],
      },
      message: {
        space: options.space,
        proposal: options.proposal,
        choice: options.choice,
        app: 'snapshot',
        reason: options.r ?? '',
        from: voterProxy,
        timestamp: Number((Date.now() / 1_000).toFixed()),
      },
    },
  }
  console.log(JSON.stringify(typedMsg.data, null, 2))

  const voteHash = snapshot.utils.getHash(typedMsg.data)
  console.log('Vote hash:')
  console.log(voteHash)

  if (options.vote) {
    const client = new snapshot.Client712()
    const response = await client.send(typedMsg)
    console.log(JSON.stringify(response, null, 2))
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
