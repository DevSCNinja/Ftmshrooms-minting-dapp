// React
import { useState, useEffect } from "react";

// Material UI
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
// Ethers
import { ethers } from "ethers";

// Web3
import Web3 from 'web3'

// Web3Modal
import Web3Modal from "web3modal";

// Contract
import SmartContract from "../../../ABI/Shrooms.json";

const SmartContractAddress = "0xd992F0D0aCC33d58e0e1Dd50B4aF52eB1f50303B";

// Components
import MintProgress from "./MintProgress/MintProgress";
import { Container, Typography } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import { Wrapper, Header, MainContent, PreviewImage, InfoContent, Div, Img, MintForm, PriceBox, PreviewImageContent } from '../../Widget';
import globalUseStyles from '../../styleHook';
import Skeleton from '@mui/material/Skeleton'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from "@mui/material/styles";

// Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MintAlert = withReactContent(Swal)

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />))(
    () => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#000000ee',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: 16,
        border: '1px solid #000',
        padding: 15
      },
    })
  );


const Mint = () => {
  const globalClasses = globalUseStyles()
  const [amount, setAmount] = useState(1);
  const [sold, setSold] = useState();
  const [price, setPrice] = useState();
  const [connected, setConnected] = useState(false);
  const [signerAddress, setSignerAddress] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const [loading, setLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [increaseLoading, setIncreaseLoading] = useState(false);
  const [decreaseLoading, setDecreaseLoading] = useState(false);

  const priceArray = [35, 50, 75, 100, 0];
  const maxBuyable = [3, 5, 1];

  const decreaseQuantity = async () => {
    const currentStage = await getCurrentStage();
    if (amount > 1 && amount <= maxBuyable[currentStage]) {
      setDecreaseLoading(true);
      setEstimateLoading(true);
      setAmount(amount - 1);
      setEstimate(amount - 1);
      setEstimateLoading(false);
    }
    setDecreaseLoading(false);
  };

  const increaseQuantity = async () => {
    const currentStage = await getCurrentStage();
    if (amount >= 1 && amount < maxBuyable[currentStage]) {
      setIncreaseLoading(true);
      setEstimateLoading(true);
      setAmount(amount + 1);
      setEstimate(amount + 1);
      setEstimateLoading(false);
    } else {

      toast.warning("You can't buy more NFT at this stage!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
    }
    setIncreaseLoading(false);
  };

  const setEstimate = async (newAmount) => {
    var web3 = new Web3(Web3.givenProvider);
    try {
      const chainId = await web3.eth.getChainId()
      if (chainId === 4002) {
        const amountForNextPrice = 500 - (sold % 500);
        const currentPriceId = await getCurrentStage();
        const currentPrice = await getCurrentPrice();
        if (newAmount > amountForNextPrice) {
          setEstimatedPrice(ethers.utils.formatEther(currentPrice) * amountForNextPrice + priceArray[currentPriceId + 1] * (sold - amountForNextPrice))
        }
        else {
          setEstimatedPrice(ethers.utils.formatEther(currentPrice) * newAmount)
        }

      } else {
        toast.error('The wrong network, please switch to the Fantom network.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getWhitelistState = async (address) => {

    var web3 = new Web3(Web3.givenProvider);
    try {
      const chainId = await web3.eth.getChainId()
      if (chainId === 4002) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = new ethers.Contract(
          SmartContractAddress,
          SmartContract.abi,
          provider
        );
        const whiteListState = await contract.whitelisted(address);
        return whiteListState;
      } else {
        toast.error('The wrong network, please switch to the Fantom network.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getCurrentStage = async () => {

    var web3 = new Web3(Web3.givenProvider);
    try {
      const chainId = await web3.eth.getChainId()
      if (chainId === 4002) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = new ethers.Contract(
          SmartContractAddress,
          SmartContract.abi,
          provider
        );
        const currentStage = await contract.getCurrentStage();
        return currentStage;
      } else {
        toast.error('The wrong network, please switch to the Fantom network.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err)
    }

  }

  const getSold = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const contract = new ethers.Contract(
      SmartContractAddress,
      SmartContract.abi,
      provider
    );

    const sold = await contract.sold();

    return sold.toString()
  }

  const handleConnection = async () => {

    var Web3 = require('web3');
    var web3 = new Web3(Web3.givenProvider);
    try {
      const chainId = await web3.eth.getChainId()
      if (chainId === 4002) {
        const web3Modal = new Web3Modal();
        ethereum
          .request({ method: 'eth_requestAccounts' })
          .then()
          .catch((err) => {
            if (err.code === -32002) {
              toast.warning('Please connect to MetaMask!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
            } else if (err.code === 4001) {
              toast.info('You rejected the connect, please connect the MetaMask', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"
              });
            } else {
              console.log(err)
            }
          });


        if (connected) {
          web3Modal.clearCachedProvider();
          setConnected(false);
        } else {
          const connection = await web3Modal.connect();
          const provider = new ethers.providers.Web3Provider(connection);
          const signer = provider.getSigner();

          /* show alert when success the connection */
          toast.success('You are connected!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
          });
          /* slice the address like 0x23...34f4 */
          setSignerAddress(signer.provider.provider.selectedAddress.slice(2, 4) + "..." + signer.provider.provider.selectedAddress.slice(36, 42));
          setConnected(true);
        }
      } else {
        toast.error('The wrong network, please switch to the Fantom network.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err)
    }


  };

  const getCurrentPrice = async () => {
    var Web3 = require('web3');
    var web3 = new Web3(Web3.givenProvider);
    try {
      const chainId = await web3.eth.getChainId()
      if (chainId === 4002) {

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          SmartContractAddress,
          SmartContract.abi,
          signer
        );

        const mintCost = await contract.getCurrentPrice();

        setEstimatedPrice(ethers.utils.formatEther(mintCost.toString()));
        return mintCost.toString();
      }
    } catch (err) {
      console.log(err)
    }
  };

  const mint = async () => {

    var Web3 = require('web3');
    var web3 = new Web3(Web3.givenProvider);

    const accounts = await web3.eth.getAccounts();
    const whiteList = await getWhitelistState(accounts[0]);

    setLoading(true);
    if (whiteList) {
      try {
        const chainId = await web3.eth.getChainId()
        if (chainId === 4002) {
          try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(
              SmartContractAddress,
              SmartContract.abi,
              signer
            );

            const mintCost = await getCurrentPrice();

            await contract.mint(amount, {
              value: (mintCost * amount).toString(),
            });

            setLoading(false)
            MintAlert.fire({
              title:
                <Typography component="h2" className={globalClasses.alertTitle}>
                  Congratulation!
                </Typography>,
              html:
                <Typography component="p" className={globalClasses.alertText}>
                  You have done!
                </Typography>,
              icon: 'success'
            })
          } catch (err) {

            setLoading(false)

            MintAlert.fire({
              title:
                <Typography component="h2" className={globalClasses.alertTitle}>
                  Oops!
                </Typography>,
              html:
                <Typography component="p" className={globalClasses.alertText}>
                  {err.data.message}
                </Typography>,
              icon: 'warning'
            })

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const network = await provider.getNetwork();

            if (network.chainId !== 4002) {

              MintAlert.fire({
                title:
                  <Typography component="h2" className={globalClasses.alertTitle}>
                    Oops!
                  </Typography>,
                html: <p>Please switch to FTM network</p>,
                icon: 'error'
              })
            } else {
              // alert("Failed to transact");
            }
          }
        } else {
          toast.error('The wrong network, please switch to the Fantom network.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
          });
        }
      } catch (err) {
        console.log(err)
      }
    } else {

      MintAlert.fire({
        title:
          <Typography component="h2" className={globalClasses.alertTitle}>
            Oops!
          </Typography>,
        html:
          <Typography component="p" className={globalClasses.alertText}>
            Only whitelisted address can mint first 250 NFTs
          </Typography>,
        icon: 'warning'
      })
    }

    setLoading(false)

  };

  const fetchProgress = async () => {

    var Web3 = require('web3');
    var web3 = new Web3(Web3.givenProvider);
    try {
      const chainId = await web3.eth.getChainId()
      if (chainId === 4002) {
        const sold = await getSold()
        checkConnect();

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          SmartContractAddress,
          SmartContract.abi,
          signer
        );

        const soldNFT = await contract.sold();
        setSold(soldNFT.toString());
      }
    } catch (err) {
      console.log(err)
    }
  };

  const checkConnect = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    setBalanceLoading(true);
    web3.eth.getBalance(accounts[0])
      .then(
        (e) => setCurrentBalance(e && ethers.utils.formatEther(e))
      );

    setBalanceLoading(false);

    if (signer._isSigner) {
      setConnected(true)
      setSignerAddress(signer.provider.provider.selectedAddress.slice(2, 4) + "..." + signer.provider.provider.selectedAddress.slice(36, 42));
    } else {
      setConnected(false)
    }
  };

  const checkNetwork = async () => {
    var Web3 = require('web3');
    var web3 = new Web3(Web3.givenProvider);
    try {
      const chainId = await web3.eth.getChainId()
      if (chainId === 4002) {
        checkConnect();
        fetchProgress();
        getCurrentPrice();
      } else {
        toast.error('The wrong network, please switch to the Fantom network.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored"
        });
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkNetwork();
  }, [])

  useEffect(() => {
    fetchProgress();
    getCurrentPrice();
  }, [sold, connected]);

  return (
    <Wrapper>
      <Header>
        <Div>
          <a href="https://ftmshrooms.io/" target="_blank" rel="noreferrer">
            <Img
              src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://ftmshrooms.io/wp-content/uploads/2021/10/cropped-fantomshrooms_logo_blue.png"
              alt=""
              className="logo"
              data-nsfw-filter-status=""
            />
          </a>
        </Div>
        <Button variant="contained" onClick={handleConnection} className={globalClasses.connectButton} disabled={connected}>
          {connected ? <p style={{ letterSpacing: 2 }}><span style={{ textTransform: "none" }}>0x</span>{signerAddress}</p> : <p>Connect</p>}
        </Button>
      </Header>
      <Container>
        <MainContent>
          <PreviewImage>
            <PreviewImageContent>
              <Img
                src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_675,h_1200/https://ftmshrooms.io/wp-content/uploads/2021/10/shroomswitch.gif"
                data-nsfw-filter-status=""
                alt=""
                className="gif"
              />
            </PreviewImageContent>
          </PreviewImage>

          <InfoContent>
            <MintForm>
              <HtmlTooltip
                title={
                  <>
                    <Typography component="h4" className={globalClasses.tooltipTitle}>We are little magic mushrooms from the lovely fantom wonderland</Typography>
                    <Typography component="p" className={globalClasses.tooltipText}>
                      👍 1-500 for 35 FTM
                    </Typography>
                    <Typography component="p" className={globalClasses.tooltipText}>
                      👍 501-1000 for 50 FTM
                    </Typography>
                    <Typography component="p" className={globalClasses.tooltipText}>
                      👍 1001-1500 for 75 FTM
                    </Typography>
                    <Typography component="p" className={globalClasses.tooltipText}>
                      👍 1501-2000 for 100 FTM
                    </Typography>
                    <Typography component="p" className={globalClasses.tooltipText}>
                      👍 2001-2250 for 0 FTM (for team)
                    </Typography>
                    <Typography component="p" className={globalClasses.tooltipText}>
                      👍 2251-2500 for 0 FTM (for holders)
                    </Typography>

                  </>
                }
              >
                <Typography component="h5" className={globalClasses.totalText}>
                  Total Shrooms Minted:&nbsp;

                  {!connected &&
                    <span style={{ fontWeight: 400, color: "#888" }}>N/A&nbsp;</span>
                  }
                  {sold} / 2500
                </Typography>
              </HtmlTooltip>

              <MintProgress progress={sold} />

              <Typography component="p" className={globalClasses.amountLabel}>
                Amount to mint
              </Typography>
              <Typography component="p" className={globalClasses.amountText}>
                (1 = &nbsp;

                {!connected &&
                  <span style={{ fontWeight: 400, color: "#888" }}>N/A&nbsp;</span>
                }
                {price && ethers.utils.formatEther(price)}
                FTM)
              </Typography>

              <ButtonGroup variant="contained" fullWidth className="wrapper">
                <LoadingButton loading={decreaseLoading} className={globalClasses.greentButton} size="small" variant="contained" onClick={decreaseQuantity}>
                  <RemoveRoundedIcon />
                </LoadingButton>
                <Button disabled>
                  <Typography component="h5" className={globalClasses.amountCount}>
                    {amount}
                  </Typography>
                </Button>

                <LoadingButton loading={increaseLoading} className={globalClasses.greentButton} size="small" variant="contained" onClick={increaseQuantity}>
                  <AddRoundedIcon />
                </LoadingButton>
              </ButtonGroup>
              {connected &&
                <PriceBox>
                  <Div>
                    <Typography component="h5" className={globalClasses.balanceLabel}>
                      You will pay
                    </Typography>
                    <Typography component="h5" className={globalClasses.balanceText}>
                      {estimateLoading &&
                        <Skeleton width={40} height={20} variant="rectangular" sx={{ bgcolor: "#ffffff30", borderRadius: 0 }} />
                      }

                      {!estimateLoading &&
                        estimatedPrice
                      }
                      <span>&nbsp;FTM</span>
                    </Typography>
                  </Div>
                  <Div>
                    <Typography component="h5" className={globalClasses.balanceLabel}>
                      Your balance
                    </Typography>
                    <Typography component="h5" className={globalClasses.balanceText}>
                      {balanceLoading &&
                        <Skeleton width={40} height={20} variant="rectangular" sx={{ bgcolor: "#ffffff30", borderRadius: 1 }} />
                      }
                      {currentBalance}<span>&nbsp;FTM</span>
                    </Typography>
                  </Div>
                </PriceBox>
              }
              <LoadingButton loading={loading} className={globalClasses.mintButton} variant="contained" onClick={mint}>
                MINT
              </LoadingButton>

            </MintForm>
          </InfoContent>
        </MainContent>
      </Container>
      <ToastContainer style={{ fontSize: 12, padding: "5px !important", lineHeight: "15px" }} />
    </Wrapper>
  );
};

export default Mint;
