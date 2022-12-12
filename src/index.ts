import snapshot from '@snapshot-labs/snapshot.js'

async function main() {
  const proposals = [
    "0x7937cb9c7791a8ab2d675a62b51b5eb0ec999898e193c83f37e3cbf98779079a",
    "0xb35c6d69ac0f9cf82531bc53ded17102955a3521fc55399b30ae556610881000",
    "0xa6a6753b0b7d903284d837e1dbb4e2243d6e458c0bd414f40edb521c474e1279",
    "0x1422e6af004997e80198bb4e9f3be5b6acf7f95bef1b7221b636f56423c1efc9",
    "0x8ba90d6f978884b5586f7cdad5e16a3555ad5b293a117c648d19da915f717373",
    "0xad1b55dec2387afa27ef1a8f12f184f6bc9b6ba72a14e8dc9cdb58010e63b93a",
  ]

  const voterProxy = '0xaF52695E1bB01A16D33D7194C28C42b10e0Dbec2'

  proposals.forEach((proposal, i) => {
  
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
          space: "balancer.eth",
          proposal: proposal,
          choice: 1,
          app: 'snapshot',
          reason: '',
          from: voterProxy,
          timestamp: 1670847629,
        },
      },
    }
    console.log(JSON.stringify(typedMsg.data, null, 2))

    const voteHash = snapshot.utils.getHash(typedMsg.data)
    console.log('Vote hash:')
    console.log(voteHash)
  });
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
