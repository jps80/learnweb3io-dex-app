const { expect } = require("chai");

describe("NFT-Power-DAO", function () {

  let tokenContract;
  let exchangeContract

  let ownerToken3io;
  let balanceOfToken3ioOwner;
  let balanceOfToken3ioExchange;

  before(async () => {

    // Deploy the Token Contract
    tokenContract = await hre.ethers.deployContract("Token3io");
    await tokenContract.waitForDeployment();
    console.log("Token3io deployed:", tokenContract.target);

    // Deploy the Exchange Contract
    exchangeContract = await hre.ethers.deployContract("Exchange", [
      tokenContract.target,
    ]);
    await exchangeContract.waitForDeployment();
    console.log("Exchange deployed:", exchangeContract.target);

    [_ownerToken3io] = await ethers.getSigners();

    ownerToken3io = _ownerToken3io;

  });

  it("smart contracts should are deployed", async function () {

    expect(tokenContract.target).to.match(/^0x[a-fA-F0-9]{40}$/);
    expect(exchangeContract.target).to.match(/^0x[a-fA-F0-9]{40}$/);

  });


  it("check Token3io owner balance", async function () {

    const balanceOfToken3io = await tokenContract.balanceOf(ownerToken3io);

    console.log(`Balance of Token3io is ${ethers.formatEther(balanceOfToken3io)}`);

    // 1 millón de tokens wei
    const expectedTokens = BigInt('1000000000000000000000000');

    expect(balanceOfToken3io).is.equal(expectedTokens);

  });


  it("set allowance ", async function () {

    //10000000000000000000 wei > 10 eth
    const amount = ethers.parseEther("10000000000000000000");

    // The Exchange relies on the ERC-20 Approve and Transfer Flow, so we need 
    // to go give it allowance for TOKEN from the Token contract.
    const isApproved = await tokenContract.approve(exchangeContract.target, amount);
    expect(isApproved.value).to.be.equal(0);

  });


  it("add liquidity ", async function () {

    const strEtherToSend = "100.0";
    const etherToSend = ethers.parseEther(strEtherToSend);  // ex 100 ETH => 100 lpETHTOKEN
    const amountOfToken3io = ethers.parseEther("10.0"); // = ethers.parseUnits("10000000000000000000","wei"); 

    // The Exchange relies on the ERC-20 Approve and Transfer Flow, so we need 
    // to go give it allowance for TOKEN from the Token contract.
    const lpTokensMinted = await exchangeContract.addLiquidity(amountOfToken3io, { value: etherToSend });
    const lpTokensMintedValue = ethers.formatEther(lpTokensMinted.value);
    console.log(`Balance of lpTokensToMinted is ${lpTokensMintedValue}`);

    expect(lpTokensMintedValue).to.be.equal(strEtherToSend);

    balanceOfToken3ioOwner = await tokenContract.balanceOf(ownerToken3io);
    console.log(`Balance of Token3io for ownerToken3io is ${ethers.formatEther(balanceOfToken3ioOwner)}`);
    balanceOfToken3ioExchange = await tokenContract.balanceOf(exchangeContract.target);
    console.log(`Balance of Token3io for Exchange SC is ${ethers.formatEther(balanceOfToken3ioExchange)}`);

  });


  it("swap ETH → Token Swap", async function () {

    const strEtherToSend = "50.0";
    const etherToSend = ethers.parseEther(strEtherToSend);
    const amountOfToken3io = ethers.parseEther("1.0");

    await exchangeContract.ethToTokenSwap(amountOfToken3io, { value: etherToSend });

    let balanceOfToken3ioOwnerSwap = await tokenContract.balanceOf(ownerToken3io);
    console.log(`Balance of Token3io for ownerToken3io is ${ethers.formatEther(balanceOfToken3ioOwnerSwap)}`);
    let balanceOfToken3ioExchangeSwap = await tokenContract.balanceOf(exchangeContract.target);
    console.log(`Balance of Token3io for Exchange SC is ${ethers.formatEther(balanceOfToken3ioExchangeSwap)}`);

    expect(balanceOfToken3ioOwnerSwap).is.greaterThan(balanceOfToken3ioOwner);
    expect(balanceOfToken3ioExchangeSwap).is.lessThan(balanceOfToken3ioExchange);

  });


  it("Token3io Swap → ETH", async function () {

    const amountOfToken3ioToSwap = ethers.parseEther("11.0");
    const amountOfEthToReceive = ethers.parseEther("0.1");

    await exchangeContract.tokenToEthSwap(amountOfToken3ioToSwap, amountOfEthToReceive);

    let balanceOfToken3ioOwnerSwap = await tokenContract.balanceOf(ownerToken3io);
    console.log(`Balance of Token3io for ownerToken3io is ${ethers.formatEther(balanceOfToken3ioOwnerSwap)}`);
    let balanceOfToken3ioExchangeSwap = await tokenContract.balanceOf(exchangeContract.target);
    console.log(`Balance of Token3io for Exchange SC is ${ethers.formatEther(balanceOfToken3ioExchangeSwap)}`);

    expect(balanceOfToken3ioOwner).is.greaterThan(balanceOfToken3ioOwnerSwap);
    expect(balanceOfToken3ioExchange).is.lessThan(balanceOfToken3ioExchangeSwap);

  });

});