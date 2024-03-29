import * as CryptoJS from 'crypto-js';

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calcuateBlockHash = (index: number, previousHash: string, timestamp: number, data: string): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.timestamp === 'number' &&
    typeof aBlock.data === 'string';

  constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, '20200201012030405012020', '', 'Hello!', 123456);

let blockchain: Array<Block> = [genesisBlock];

const getBlockchain = (): Array<Block> => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const nextTimestamp: number = getNewTimestamp();
  const nextHash: string = Block.calcuateBlockHash(newIndex, previousBlock.hash, nextTimestamp, data);
  const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);
  addBlock(newBlock);
  return newBlock;
};

const getHashForBlock = (aBlock: Block): string => Block.calcuateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  }  else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block) : void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');

console.log(blockchain);